import {
  pgTable,
  serial,
  integer,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";
import { Questions } from "./Questions";

export const Choices = pgTable("Choices", {
  MaLC: serial("MaLC").primaryKey(),
  MaCH: integer("MaCH").references(() => Questions.MaCH),
  NoiDungLC: varchar("NoiDungLC", { length: 255 }),
  LaDAD: boolean("LaDAD").default(false),
});

export type Choice = {
  MaLC: number;
  MaCH: number;
  NoiDungLC: string;
  LaDAD: boolean;
};
