import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const exampleRouter = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(async ({ ctx, input }) => {
            const test = await ctx.db.query.Accounts.findFirst();
            return {
                greeting: `Hello ${test?.name}`,
            };
        }),
});
