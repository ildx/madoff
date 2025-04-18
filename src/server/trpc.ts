import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

// Initialize context
// Add session or other context properties here if needed
type CreateContextOptions = Record<string, never>;

export const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    // Add context properties here
  };
};

export const createTRPCContext = async () => {
  // Add session/auth logic here if needed
  return createInnerTRPCContext({});
};

// Initialize tRPC
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

// Export reusable router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;
export const mergeRouters = t.mergeRouters;
