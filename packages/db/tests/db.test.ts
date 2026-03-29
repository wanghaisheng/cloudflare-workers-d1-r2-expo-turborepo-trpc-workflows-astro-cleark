import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getLocalDB, getMemoryDB } from '../src/client-local';
import { moments, recaps, userMeta } from '../src/schema';
import { eq } from 'drizzle-orm';

describe('Database Tests', () => {
  let db: ReturnType<typeof getMemoryDB>;

  beforeEach(() => {
    db = getMemoryDB();
  });

  afterEach(() => {
    // Clean up is handled automatically with in-memory database
  });

  describe('UserMeta', () => {
    it('should create and retrieve user metadata', async () => {
      const userId = 'test-user-123';
      const email = 'test@example.com';
      
      // Insert user metadata
      await db.insert(userMeta).values({
        userId,
        email,
        createdAt: new Date(),
        timezone: 'Asia/Shanghai',
        artStyle: '3d animated style',
      });

      // Retrieve user metadata
      const result = await db.select().from(userMeta).where(eq(userMeta.userId, userId));
      
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        userId,
        email,
        timezone: 'Asia/Shanghai',
        artStyle: '3d animated style',
      });
    });

    it('should update user metadata', async () => {
      const userId = 'test-user-456';
      
      // Insert initial data
      await db.insert(userMeta).values({
        userId,
        email: 'old@example.com',
        createdAt: new Date(),
      });

      // Update the record
      await db.update(userMeta)
        .set({ 
          email: 'new@example.com',
          lastRecapAt: new Date(),
        })
        .where(eq(userMeta.userId, userId));

      // Verify update
      const result = await db.select().from(userMeta).where(eq(userMeta.userId, userId));
      expect(result[0].email).toBe('new@example.com');
      expect(result[0].lastRecapAt).toBeInstanceOf(Date);
    });
  });

  describe('Moments', () => {
    it('should create and retrieve moments', async () => {
      const userId = 'test-user-789';
      const momentText = 'Today was a great day!';
      
      // Insert moment
      await db.insert(moments).values({
        userId,
        text: momentText,
        createdAt: new Date(),
      });

      // Retrieve moments
      const result = await db.select().from(moments).where(eq(moments.userId, userId));
      
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        userId,
        text: momentText,
      });
      expect(result[0].id).toBeGreaterThan(0);
    });
  });

  describe('Recaps', () => {
    it('should create and retrieve recaps', async () => {
      const userId = 'test-user-recap';
      const recapText = 'Weekly summary of achievements';
      
      // Insert recap
      await db.insert(recaps).values({
        userId,
        text: recapText,
        type: 'weekly',
        createdAt: new Date(),
        imageId: 'img-123',
      });

      // Retrieve recaps
      const result = await db.select().from(recaps).where(eq(recaps.userId, userId));
      
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        userId,
        text: recapText,
        type: 'weekly',
        imageId: 'img-123',
      });
    });
  });

  describe('Relationships', () => {
    it('should handle user with multiple moments and recaps', async () => {
      const userId = 'test-user-relations';
      
      // Insert user
      await db.insert(userMeta).values({
        userId,
        email: 'relations@example.com',
        createdAt: new Date(),
      });

      // Insert multiple moments
      await db.insert(moments).values([
        { userId, text: 'Moment 1', createdAt: new Date() },
        { userId, text: 'Moment 2', createdAt: new Date() },
        { userId, text: 'Moment 3', createdAt: new Date() },
      ]);

      // Insert recaps
      await db.insert(recaps).values([
        { userId, text: 'Daily recap', type: 'daily', createdAt: new Date() },
        { userId, text: 'Weekly recap', type: 'weekly', createdAt: new Date() },
      ]);

      // Verify counts
      const userResult = await db.select().from(userMeta).where(eq(userMeta.userId, userId));
      const momentsResult = await db.select().from(moments).where(eq(moments.userId, userId));
      const recapsResult = await db.select().from(recaps).where(eq(recaps.userId, userId));

      expect(userResult).toHaveLength(1);
      expect(momentsResult).toHaveLength(3);
      expect(recapsResult).toHaveLength(2);
    });
  });
});
