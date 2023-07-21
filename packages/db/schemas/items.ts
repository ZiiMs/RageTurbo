import { pgTable, serial, text } from "drizzle-orm/pg-core"

export const Items = pgTable('items', {
    id: serial('id').primaryKey(),
    name: text('name'),
    image: text('image'),
    event: text('event_name')
})

