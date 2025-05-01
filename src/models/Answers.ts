import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { Users } from "./Users";
import { Exams } from "./Exams";
import { Questions } from "./Questions";
import { Choices } from "./Choices";

export const Answers = pgTable("Answers", {
  MaCTL: serial("MaCTL").primaryKey(),
  MaHS: integer("MaHS").references(() => Users.MaND),
  MaDT: integer("MaDT").references(() => Exams.MaDT),
  MaCH: integer("MaCH").references(() => Questions.MaCH),
  MaLC: integer("MaLC").references(() => Choices.MaLC),
  ThoiGianNop: timestamp("ThoiGianNop").defaultNow(),
});

export type Answer = {
  MaCTL: number;
  MaHS: number;
  MaDT: number;
  MaCH: number;
  MaLC: number;
  ThoiGianNop: Date;
};
