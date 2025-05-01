import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config(); // Load biến môi trường từ file .env

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.POSTGRES_HOST!,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USERNAME!,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_NAME!,
    ssl: false,
  },
  out: "./drizzle/migrations",
});
