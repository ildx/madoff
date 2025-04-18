import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure.input(z.object({ text: z.string().optional() })).query(({ input }) => {
    return {
      greeting: `Hello ${input.text ?? "world"}`,
      date: new Date(),
    };
  }),

  getAll: publicProcedure.query(() => {
    // This could fetch data from a database in a real application
    return [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];
  }),
});
