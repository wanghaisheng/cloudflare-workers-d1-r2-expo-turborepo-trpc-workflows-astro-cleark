import { Client } from '@openilink/openilink-sdk-node';

interface BotCredentials {
  bot_id: string;
  bot_token: string;
  base_url: string;
  ilink_user_id: string;
}

export function parseBotCredentials(credentialsJson: string | undefined): BotCredentials {
  return JSON.parse(credentialsJson ?? '{}');
}

export function createILinkClient(creds: BotCredentials): Client {
  return new Client(creds.bot_token, {
    base_url: creds.base_url || undefined,
  });
}

export function createILinkClientFromBot(bot: { credentials?: string | null }): Client {
  const creds = parseBotCredentials(bot.credentials ?? '{}');
  return createILinkClient(creds);
}
