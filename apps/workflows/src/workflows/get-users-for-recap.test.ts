import { describe, it, expect, beforeEach } from 'vitest';
import { getMemoryDB, userMeta } from '@acme/db';
import { eq, isNull, lt, and, gt, or } from 'drizzle-orm';

// Mock environment for testing
const mockEnv = {
  DB: null as any,
} as any;

describe('GetUsersForRecapWorkflow', () => {
  let db: ReturnType<typeof getMemoryDB>;

  beforeEach(() => {
    db = getMemoryDB();
  });

  describe('User Selection Logic', () => {
    it('should find users who have never had a recap', async () => {
      const now = new Date();
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      // Insert users without recaps
      await db.insert(userMeta).values([
        {
          userId: 'user-1',
          email: 'user1@example.com',
          createdAt: new Date(),
          lastRecapAt: null,
        },
        {
          userId: 'user-2', 
          email: 'user2@example.com',
          createdAt: new Date(),
          lastRecapAt: null,
        },
      ]);

      // Insert users with recent recaps (should not be selected)
      await db.insert(userMeta).values([
        {
          userId: 'user-3',
          email: 'user3@example.com',
          createdAt: new Date(),
          lastRecapAt: new Date(), // Recent recap
        },
      ]);

      // Test the selection logic
      const usersNeedingRecap = await db.select()
        .from(userMeta)
        .where(
          or(
            isNull(userMeta.lastRecapAt),
            lt(userMeta.lastRecapAt, twentyFourHoursAgo)
          )
        );

      expect(usersNeedingRecap).toHaveLength(2);
      expect(usersNeedingRecap.map(u => u.userId)).toEqual(['user-1', 'user-2']);
    });

    it('should find users with old recaps (older than 24 hours)', async () => {
      const now = new Date();
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

      // Insert users with old recaps
      await db.insert(userMeta).values([
        {
          userId: 'user-old-1',
          email: 'old1@example.com',
          createdAt: new Date(),
          lastRecapAt: fortyEightHoursAgo, // Old recap
        },
        {
          userId: 'user-old-2',
          email: 'old2@example.com', 
          createdAt: new Date(),
          lastRecapAt: fortyEightHoursAgo, // Old recap
        },
      ]);

      // Insert user with recent recap (should not be selected)
      await db.insert(userMeta).values({
        userId: 'user-recent',
        email: 'recent@example.com',
        createdAt: new Date(),
        lastRecapAt: new Date(), // Recent recap
      });

      // Test the selection logic
      const usersNeedingRecap = await db.select()
        .from(userMeta)
        .where(
          or(
            isNull(userMeta.lastRecapAt),
            lt(userMeta.lastRecapAt, twentyFourHoursAgo)
          )
        );

      expect(usersNeedingRecap).toHaveLength(2);
      expect(usersNeedingRecap.map(u => u.userId)).toEqual(['user-old-1', 'user-old-2']);
    });

    it('should handle batch processing with lastProcessedUserId', async () => {
      // Insert users in a predictable order
      await db.insert(userMeta).values([
        { userId: 'user-a', email: 'a@example.com', createdAt: new Date() },
        { userId: 'user-b', email: 'b@example.com', createdAt: new Date() },
        { userId: 'user-c', email: 'c@example.com', createdAt: new Date() },
        { userId: 'user-d', email: 'd@example.com', createdAt: new Date() },
      ]);

      // Test pagination logic
      const batchSize = 2;
      const lastProcessedUserId = 'user-b';

      // Simulate the query with pagination
      const batch = await db.select()
        .from(userMeta)
        .where(
          and(
            gt(userMeta.userId, lastProcessedUserId),
            or(
              isNull(userMeta.lastRecapAt),
              lt(userMeta.lastRecapAt, new Date(Date.now() - 24 * 60 * 60 * 1000))
            )
          )
        )
        .limit(batchSize)
        .orderBy(userMeta.userId);

      expect(batch).toHaveLength(2);
      expect(batch.map(u => u.userId)).toEqual(['user-c', 'user-d']);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty database gracefully', async () => {
      const users = await db.select().from(userMeta);
      expect(users).toHaveLength(0);
    });

    it('should handle users with null lastRecapAt', async () => {
      await db.insert(userMeta).values({
        userId: 'user-null',
        email: 'null@example.com',
        createdAt: new Date(),
        lastRecapAt: null,
      });

      const users = await db.select()
        .from(userMeta)
        .where(isNull(userMeta.lastRecapAt));

      expect(users).toHaveLength(1);
      expect(users[0].userId).toBe('user-null');
      expect(users[0].lastRecapAt).toBeNull();
    });
  });
});
