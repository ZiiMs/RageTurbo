import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import dotenv from 'dotenv'
import * as schema from './schemas'

dotenv.config({ debug: true })
//
const client = postgres(process.env.DATABASE_URL ?? '')


export const db = drizzle(client, { schema: schema });


export * from 'drizzle-orm'
export { Accounts } from './schemas'
