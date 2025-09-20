CREATE TYPE "public"."provider" AS ENUM('GITHUB', 'GOOGLE');--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" uuid NOT NULL,
	"provider" "provider" NOT NULL,
	CONSTRAINT "accounts_provider_userId_unique" UNIQUE("provider","user_id")
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;