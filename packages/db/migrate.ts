import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from 'postgres';
import dotenv from 'dotenv'

dotenv.config({ path: '../../.env' , debug: true })
const migrationClient = postgres(process.env.DATABASE_URL ?? '', { max: 1 });
migrate(drizzle(migrationClient), { migrationsFolder: "./drizzle" }).then(() => {
    console.log("Success")
}).catch((err) => {
    console.error("Error", err)
}).finally(() => {
    process.exit(0)
})



