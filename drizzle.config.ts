import 'dotenv/config';
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./drizzle",
    schema: "./src/schema.ts",
    dialect: "postgresql", // ← Указываем диалект вместо драйвера
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
