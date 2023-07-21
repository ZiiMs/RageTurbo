DO $$ BEGIN
 CREATE TYPE "rank" AS ENUM('admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"ip_address" "inet",
	"rank" "rank" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "characters" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"bank" bigint DEFAULT 1500 NOT NULL,
	"cash" bigint DEFAULT 500 NOT NULL,
	"phone_number" bigint NOT NULL,
	"faction_id" integer,
	"account_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inventory" (
	"id" serial PRIMARY KEY NOT NULL,
	"character_id" integer,
	"item_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "items" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"image" text,
	"event_name" text
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "username_idx" ON "accounts" ("username");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "first_idx" ON "characters" ("firstName");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "last_idx" ON "characters" ("lastName");