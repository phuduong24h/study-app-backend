import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { Users } from "./Users";

export const Questions = pgTable("Questions", {
  MaCH: serial("MaCH").primaryKey(),
  NoiDungCH: varchar("NoiDungCH", { length: 5000 }),
  MaND: integer("MaND").references(() => Users.MaND),
  NgayTao: timestamp("NgayTao").defaultNow(),
});

export type Question = {
  MaCH: number;
  NoiDungCH: string;
  MaND: number;
  NgayTao: Date;
};
