import type { Config } from "drizzle-kit";
import 'dotenv/config';

export default {
    schema: "./src/drizzle/schema.ts",
    out: "./src/drizzle/migrations",
    dialect: "postgresql", // ← Указываем диалект вместо драйвера
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
} satisfies Config;
