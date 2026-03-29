import type { DB } from '../db';
import { settings } from '../db/schema';
import { eq, like } from 'drizzle-orm';

export async function get<T = string>(db: DB, key: string, defaultValue?: T): Promise<T | null> {
  const result = await db.select().from(settings).where(eq(settings.key, key)).limit(1);
  if (result.length === 0) return defaultValue ?? null;
  const raw = result[0].value;
  if (typeof defaultValue === 'object') return JSON.parse(raw!) as T;
  return raw as T;
}

export async function set<T = string>(db: DB, key: string, value: T): Promise<void> {
  const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
  await db.insert(settings)
    .values({ key, value: stringValue })
    .onConflictDoUpdate({
      target: settings.key,
      set: { value: stringValue, updatedAt: new Date() }
    });
}

export async function del(db: DB, key: string): Promise<void> {
  await db.delete(settings).where(eq(settings.key, key));
}

export async function listByPrefix(db: DB, prefix: string): Promise<Record<string, string>> {
  const rows = await db.select().from(settings).where(like(settings.key, `${prefix}%`));
  const result: Record<string, string> = {};
  for (const row of rows) {
    result[row.key] = row.value!;
  }
  return result;
}
