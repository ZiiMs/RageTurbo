import { relations } from "drizzle-orm";
import { pgTable, serial, varchar, uniqueIndex, timestamp, inet, pgEnum } from "drizzle-orm/pg-core";
import { Characters } from "./character";

export const rankEnum = pgEnum('rank', ['admin', 'user'])
export const Accounts = pgTable('accounts', {
    id: serial('id').primaryKey(),
    username: varchar('username').notNull(),
    password: varchar('password').notNull(),
    ip: inet('ip_address'),
    rank: rankEnum('rank').notNull().default('user'),
    createdAt: timestamp("created_at").notNull().defaultNow(),
}, (Accounts) => {
    return {
        usernameIndex: uniqueIndex('username_idx').on(Accounts.username)
    }
})

export const accountsRelation = relations(Accounts, ({ many }) => ({
    characters: many(Characters),
}))
