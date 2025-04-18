import { exampleRouter } from "./routers/example";
import { userRouter } from "./routers/userRouter";
import { router } from "./trpc";

export const appRouter = router({
  example: exampleRouter,
  users: userRouter,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
