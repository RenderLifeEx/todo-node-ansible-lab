CREATE TABLE "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"completed" boolean DEFAULT false,
	"order" integer DEFAULT 0 NOT NULL,
	"position" double precision
);
