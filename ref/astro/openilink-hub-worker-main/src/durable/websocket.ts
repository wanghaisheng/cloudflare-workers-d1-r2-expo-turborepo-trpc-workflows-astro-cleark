import { DurableObject } from 'cloudflare:workers';
import { Client, TYPING, CANCEL_TYPING } from '@openilink/openilink-sdk-node';

interface Envelope {
  type: string;
  req_id?: string;
  data: any;
}

interface ConnMeta {
  channelId: string;
  botId: string;
  botToken: string;
  botBaseUrl: string;
  botUserId: string;
}

export class WebSocketManager extends DurableObject {
  private connections = new Map<WebSocket, ConnMeta>();

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/ws') {
      const upgradeHeader = request.headers.get('Upgrade');
      if (upgradeHeader !== 'websocket') {
        return new Response('Expected Upgrade: websocket', { status: 426 });
      }

      const webSocketPair = new WebSocketPair();
      const client = webSocketPair[0];
      const server = webSocketPair[1];

      const channelId = url.searchParams.get('channel_id') || '';
      const botId = url.searchParams.get('bot_id') || '';
      const channelName = url.searchParams.get('channel_name') || '';
      const botStatus = url.searchParams.get('bot_status') || 'disconnected';
      const missedJson = url.searchParams.get('missed') || '[]';

      // Parse bot credentials for sending messages
      let botToken = '', botBaseUrl = '', botUserId = '';
      try {
        const creds = JSON.parse(url.searchParams.get('bot_credentials') || '{}');
        botToken = creds.bot_token || '';
        botBaseUrl = creds.base_url || '';
        botUserId = creds.ilink_user_id || '';
      } catch { /* ignore */ }

      this.ctx.acceptWebSocket(server);
      this.connections.set(server, { channelId, botId, botToken, botBaseUrl, botUserId });

      // Send init message
      server.send(JSON.stringify({
        type: 'init',
        data: { channel_id: channelId, channel_name: channelName, bot_id: botId, bot_status: botStatus }
      }));

      // Replay missed messages
      try {
        const missed: any[] = JSON.parse(missedJson);
        for (const m of missed) {
          server.send(JSON.stringify({
            type: 'message',
            data: {
              seq_id: m.id,
              sender: m.sender || '',
              recipient: m.recipient || '',
              timestamp: m.created_at ? new Date(m.created_at).getTime() : Date.now(),
              message_state: 0,
              items: [{ type: m.msg_type || 'text', text: extractContent(m.payload) }]
            }
          }));
        }
      } catch { /* ignore parse errors */ }

      return new Response(null, { status: 101, webSocket: client });
    }

    // Broadcast to all connections for a given bot (requires internal auth)
    if (url.pathname === '/broadcast') {
      const authHeader = request.headers.get('X-Internal-Key');
      if (!authHeader || authHeader !== url.searchParams.get('secret')) {
        return new Response('Forbidden', { status: 403 });
      }

      const body = await request.json() as { bot_id: string; envelope: Envelope };
      for (const [ws, meta] of this.connections) {
        if (meta.botId === body.bot_id) {
          try { ws.send(JSON.stringify(body.envelope)); } catch { /* client gone */ }
        }
      }
      return new Response('ok');
    }

    return new Response('not found', { status: 404 });
  }

  private createClient(meta: ConnMeta): Client | null {
    if (!meta.botToken) return null;
    return new Client(meta.botToken, { base_url: meta.botBaseUrl || undefined });
  }

  async webSocketMessage(ws: WebSocket, message: string | ArrayBuffer) {
    const meta = this.connections.get(ws);
    if (!meta) return;

    try {
      const env: Envelope = JSON.parse(message as string);
      switch (env.type) {
        case 'send_text': {
          const { recipient, text, context_token } = env.data || {};
          if (!text) {
            ws.send(JSON.stringify({ type: 'send_ack', req_id: env.req_id, data: { success: false, error: 'text required' } }));
            break;
          }
          const client = this.createClient(meta);
          if (!client) {
            ws.send(JSON.stringify({ type: 'send_ack', req_id: env.req_id, data: { success: false, error: 'bot not configured' } }));
            break;
          }
          try {
            const clientId = await client.sendText(recipient || meta.botUserId, text, context_token || '');
            ws.send(JSON.stringify({ type: 'send_ack', req_id: env.req_id, data: { success: true, client_id: clientId } }));
          } catch (err: any) {
            ws.send(JSON.stringify({ type: 'send_ack', req_id: env.req_id, data: { success: false, error: err.message } }));
          }
          break;
        }

        case 'send_typing': {
          const { ticket, status, user_id } = env.data || {};
          const client = this.createClient(meta);
          if (client && ticket) {
            try {
              const typingStatus = status === 'cancel' ? CANCEL_TYPING : TYPING;
              await client.sendTyping(user_id || meta.botUserId, ticket, typingStatus);
              ws.send(JSON.stringify({ type: 'send_ack', req_id: env.req_id, data: { success: true } }));
            } catch (err: any) {
              ws.send(JSON.stringify({ type: 'send_ack', req_id: env.req_id, data: { success: false, error: err.message } }));
            }
          } else {
            ws.send(JSON.stringify({ type: 'send_ack', req_id: env.req_id, data: { success: true } }));
          }
          break;
        }

        case 'get_config': {
          const { user_id, context_token } = env.data || {};
          const client = this.createClient(meta);
          if (!client) {
            ws.send(JSON.stringify({ type: 'config', req_id: env.req_id, data: { typing_ticket: '' } }));
            break;
          }
          try {
            const config = await client.getConfig(user_id || meta.botUserId, context_token || '');
            ws.send(JSON.stringify({ type: 'config', req_id: env.req_id, data: config }));
          } catch {
            ws.send(JSON.stringify({ type: 'config', req_id: env.req_id, data: { typing_ticket: '' } }));
          }
          break;
        }

        case 'ping':
          ws.send(JSON.stringify({ type: 'pong' }));
          break;

        default:
          ws.send(JSON.stringify({
            type: 'error',
            data: { code: 'unknown_type', message: `unknown message type: ${env.type}` }
          }));
      }
    } catch {
      ws.send(JSON.stringify({ type: 'error', data: { code: 'parse_error', message: 'invalid JSON' } }));
    }
  }

  async webSocketClose(ws: WebSocket) {
    this.connections.delete(ws);
  }

  async webSocketError(ws: WebSocket) {
    this.connections.delete(ws);
  }
}

function extractContent(payload: string | undefined): string {
  if (!payload) return '';
  try {
    return JSON.parse(payload).content || '';
  } catch {
    return '';
  }
}
