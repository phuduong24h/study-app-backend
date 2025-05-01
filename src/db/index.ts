import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { config } from "dotenv";

config(); // Load các biến môi trường từ .env

// Cấu hình kết nối với PostgreSQL
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_NAME,
});

// Tạo kết nối Drizzle ORM
const db = drizzle(pool); // Kết nối với PostgreSQL thông qua Drizzle ORM

export { db }; // Export db để sử dụng ở các phần khác trong ứng dụng
