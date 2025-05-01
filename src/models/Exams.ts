import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { Users } from "./Users";

export const Exams = pgTable("Exams", {
  MaDT: serial("MaDT").primaryKey(),
  TieuDe: varchar("TieuDe", { length: 255 }),
  MatKhau: varchar("MatKhau", { length: 255 }),
  MaND: integer("MaND").references(() => Users.MaND),
  NgayTao: timestamp("NgayTao").defaultNow(),
});

export type Exam = {
  MaDT: number;
  TieuDe: string;
  MatKhau: string;
  MaND: number;
  NgayTao: Date;
};
