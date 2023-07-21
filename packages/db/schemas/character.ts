import { pgTable, serial, uniqueIndex, integer, text, bigint, timestamp } from "drizzle-orm/pg-core"
import { Accounts } from "./accounts"
import { relations } from "drizzle-orm"
import { Inventory } from "./inventory"

export const Characters = pgTable('characters', {
    id: serial('id').primaryKey(),
    firstName: text("firstName").notNull(),
    lastName: text("lastName").notNull(),
    bank: bigint('bank', { mode: 'number' }).notNull().default(1500),
    cash: bigint('cash', { mode: 'number' }).notNull().default(500),
    phoneNumber: bigint('phone_number', { mode: 'number' }).notNull(),
    factionId: integer('faction_id'),
    accountId: integer('account_id'),
    createdAt: timestamp("created_at").notNull().defaultNow(),

}, (Characters) => {
    return {
        firstIndex: uniqueIndex('first_idx').on(Characters.firstName),
        lastIndex: uniqueIndex('last_idx').on(Characters.lastName)
    }
})

export const charactersRelations = relations(Characters, ({ one, many }) => ({
    account: one(Accounts, {
        fields: [Characters.accountId],
        references: [Accounts.id]
    }),
    inventory: many(Inventory)
}))
