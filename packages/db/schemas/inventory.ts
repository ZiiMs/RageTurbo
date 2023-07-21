
import { relations } from "drizzle-orm"
import { integer, pgTable, serial } from "drizzle-orm/pg-core"
import { Characters } from "./character"
import { Items } from "./items"

export const Inventory = pgTable('inventory', {
    id: serial('id').primaryKey(),
    characterId: integer('character_id'),
    itemId: integer('item_id').notNull()
})

export const inventoryRelations = relations(Inventory, ({ one }) => ({
    character: one(Characters, {
        fields: [Inventory.characterId],
        references: [Characters.id]
    }),
    item: one(Items, {
        fields: [Inventory.itemId],
        references: [Items.id]
    })
}))
