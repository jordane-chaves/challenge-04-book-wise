ALTER TABLE "accounts" DROP CONSTRAINT "accounts_provider_userId_unique";--> statement-breakpoint
CREATE UNIQUE INDEX "accounts_provider_user_id_index" ON "accounts" USING btree ("provider","user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "ratings_book_id_user_id_index" ON "ratings" USING btree ("book_id","user_id");