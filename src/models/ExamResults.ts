import {
  pgTable,
  serial,
  integer,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";
import { Exams } from "./Exams";
import { Users } from "./Users";

export const ExamResults = pgTable("ExamResults", {
  MaKQ: serial("MaKQ").primaryKey(),
  MaDT: integer("MaDT").references(() => Exams.MaDT),
  MaHS: integer("MaHS").references(() => Users.MaND),
  Diem: numeric("Diem", { precision: 10, scale: 2 }),
  ThoiGianNop: timestamp("ThoiGianNop").defaultNow(),
});

export type ExamResult = {
  MaKQ: number;
  MaDT: number;
  MaHS: number;
  Diem: number;
  ThoiGianNop: Date;
};
