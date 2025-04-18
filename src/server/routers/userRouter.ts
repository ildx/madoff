import { eq, like } from "drizzle-orm";
import { z } from "zod";
import { db } from "../../db";
import { users } from "../../db/schema/schema";
import { publicProcedure, router } from "../trpc";

// Define Zod schemas for validating input
const userIdSchema = z.object({
  id: z.number(),
});

const userCuidSchema = z.object({
  cuid: z.string(),
});

const userEmailSchema = z.object({
  email: z.string().email(),
});

const userSearchSchema = z.object({
  searchTerm: z.string().optional(),
  limit: z.number().min(1).max(100).default(10),
  offset: z.number().min(0).default(0),
});

// Create the user router with various query procedures
export const userRouter = router({
  // Get all users with optional pagination
  getAll: publicProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(100).default(50),
          offset: z.number().min(0).default(0),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      const { limit = 50, offset = 0 } = input || {};
      return db.select().from(users).limit(limit).offset(offset);
    }),

  // Get a single user by their numeric ID
  getById: publicProcedure.input(userIdSchema).query(async ({ input }) => {
    const result = await db.select().from(users).where(eq(users.id, input.id));
    return result[0] || null;
  }),

  // Get a single user by their CUID
  getByCuid: publicProcedure.input(userCuidSchema).query(async ({ input }) => {
    const result = await db.select().from(users).where(eq(users.cuid, input.cuid));
    return result[0] || null;
  }),

  // Get a single user by their email
  getByEmail: publicProcedure.input(userEmailSchema).query(async ({ input }) => {
    const result = await db.select().from(users).where(eq(users.email, input.email));
    return result[0] || null;
  }),

  // Search users by username, first name, last name, or email
  searchUsers: publicProcedure.input(userSearchSchema).query(async ({ input }) => {
    const { searchTerm, limit, offset } = input;

    if (!searchTerm) {
      return db.select().from(users).limit(limit).offset(offset);
    }

    const searchPattern = `%${searchTerm}%`;
    return db
      .select()
      .from(users)
      .where(
        like(users.username, searchPattern),
        // You can add more conditions with "or" to search in multiple fields
        // .or(like(users.firstName, searchPattern))
        // .or(like(users.lastName, searchPattern))
        // .or(like(users.email, searchPattern))
      )
      .limit(limit)
      .offset(offset);
  }),
});
