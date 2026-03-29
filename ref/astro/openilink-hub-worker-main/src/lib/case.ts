/**
 * Convert camelCase keys to snake_case recursively.
 * Also converts Date-like ISO strings in timestamp fields to Unix seconds,
 * and parses JSON string fields that should be objects.
 */
const TIMESTAMP_KEYS = new Set(['created_at', 'updated_at', 'expires_at', 'last_msg_at']);
const JSON_STRING_KEYS = new Set(['payload', 'filter_rule', 'ai_config', 'credentials', 'sync_state']);

export function toSnake(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj.map(toSnake);
  if (obj instanceof Date) return Math.floor(obj.getTime() / 1000);
  if (typeof obj !== 'object') return obj;

  const result: any = {};
  for (const key of Object.keys(obj)) {
    const snakeKey = key.replace(/[A-Z]/g, (m) => '_' + m.toLowerCase());
    let val = obj[key];
    if (TIMESTAMP_KEYS.has(snakeKey) && typeof val === 'string') {
      const ts = Date.parse(val);
      val = isNaN(ts) ? val : Math.floor(ts / 1000);
    } else if (JSON_STRING_KEYS.has(snakeKey) && typeof val === 'string') {
      try { val = JSON.parse(val); } catch { /* keep as string */ }
    } else {
      val = toSnake(val);
    }
    result[snakeKey] = val;
  }
  return result;
}
