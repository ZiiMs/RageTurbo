import { TRPCError } from "@trpc/server";
import { Accounts } from "@ziim/db";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import bcrypt from "bcrypt";
import { AES, enc } from "crypto-js";
import { type PostgresError } from "postgres";
import { z } from "zod";

console.log("Init TRPC");
export const userRouter = createTRPCRouter({
    login: publicProcedure
        .input(z.object({ username: z.string(), password: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const foundAccount = await ctx.db.query.Accounts.findFirst({
                where: (account, { eq }) => eq(account.username, input.username),
            });

            if (foundAccount === undefined) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Invalid username or password, please try again.",
                });
            }
            const key = input.password.slice(0, 36);
            const encodedPass = input.password.slice(36);

            const hashedPass = AES.decrypt(encodedPass, key).toString(enc.Utf8);
            const success = await bcrypt.compare(hashedPass, foundAccount.password);
            console.log("Suc", success);
            if (success) {
                return foundAccount;
            } else {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "P0002: Invalid username or password, please try again.",
                });
            }
        }),

    register: publicProcedure
        .input(z.object({ username: z.string(), password: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const key = input.password.slice(0, 36);
            const encodedPass = input.password.slice(36);

            const hashedPass = await bcrypt.hash(
                AES.decrypt(encodedPass, key).toString(enc.Utf8),
                10
            );

            const account = await ctx.db
                .insert(Accounts)
                .values({
                    username: input.username,
                    password: hashedPass,
                })
                .returning()
                .catch((error: PostgresError) => {
                    if (error.code === "23505") {
                        throw new TRPCError({
                            code: "CONFLICT",
                            message: `23505: Username ${input.username} already exists`,
                        });
                    }
                    console.warn("Error:: ", error.code);
                });
            if (account && account[0]) {
                return account[0];
            }
            return null;
        }),
    get: publicProcedure.query(async ({ ctx }) => {
        return "Success?";
    }),
});
