import { TRPCError } from "@trpc/server";
import { Accounts } from "@ziim/db";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import bcrypt from "bcrypt";
import { type PostgresError } from "postgres";
import { z } from "zod";

console.log("Init TRPC");
export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const hashed = await bcrypt.hash(input.password, 12);
      const account = await ctx.db
        .insert(Accounts)
        .values({
          username: input.username,
          password: hashed,
        })
        .returning()
        .catch((error: PostgresError) => {
          if (error.code === "23505") {
            throw new TRPCError({
              code: "CONFLICT",
              message: `Error: Username ${input.username} already exists`,
            });
          }
          console.warn("Error:: ", error.code);
        });
      if (account && account[0]) {
        return account[0];
      }
      return null;
    }),
});
