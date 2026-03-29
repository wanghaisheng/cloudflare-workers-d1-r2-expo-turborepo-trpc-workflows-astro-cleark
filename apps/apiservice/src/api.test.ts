import { describe, it, expect, beforeEach } from 'vitest';
import { getMemoryDB, userMeta } from '@acme/db';
import { eq } from 'drizzle-orm';

describe('API Service Database Tests', () => {
  let db: ReturnType<typeof getMemoryDB>;

  beforeEach(() => {
    db = getMemoryDB();
  });

  describe('User Operations', () => {
    it('should create and retrieve users', async () => {
      const userData = {
        userId: 'api-user-1',
        email: 'api@example.com',
        createdAt: new Date(),
        timezone: 'Asia/Shanghai',
        artStyle: '3d animated style' as const,
      };

      // Insert user
      await db.insert(userMeta).values(userData);

      // Retrieve user
      const result = await db.select()
        .from(userMeta)
        .where(eq(userMeta.userId, userData.userId));

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        userId: userData.userId,
        email: userData.email,
        timezone: userData.timezone,
        artStyle: userData.artStyle,
      });
      expect(result[0]?.createdAt).toBeInstanceOf(Date);
    });

    it('should handle user updates', async () => {
      const userId = 'api-user-2';
      
      // Insert initial user
      await db.insert(userMeta).values({
        userId,
        email: 'old@example.com',
        createdAt: new Date(),
      });

      // Update user
      await db.update(userMeta)
        .set({ 
          email: 'new@example.com',
          lastRecapAt: new Date(),
        })
        .where(eq(userMeta.userId, userId));

      // Verify update
      const result = await db.select()
        .from(userMeta)
        .where(eq(userMeta.userId, userId));

      expect(result[0].email).toBe('new@example.com');
      expect(result[0].lastRecapAt).toBeInstanceOf(Date);
    });
  });

  describe('API Response Format', () => {
    it('should return proper user data structure', async () => {
      const userData = {
        userId: 'api-user-3',
        email: 'structure@example.com',
        createdAt: new Date(),
        artStyle: 'classical painting' as const,
      };

      await db.insert(userMeta).values(userData);

      const result = await db.select()
        .from(userMeta)
        .where(eq(userMeta.userId, userData.userId));

      const user = result[0];
      
      // Verify API response structure
      expect(user).toHaveProperty('userId');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('artStyle');
      expect(user).toHaveProperty('timezone');
      expect(user).toHaveProperty('lastRecapAt');
      
      // Verify types
      expect(typeof user.userId).toBe('string');
      expect(typeof user.email).toBe('string');
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(typeof user.artStyle).toBe('string');
    });
  });
});
