import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const Users = pgTable("Users", {
  MaND: serial("MaND").primaryKey(),
  MaHS: varchar("MaHS", { length: 50 }),
  Ten: varchar("Ten", { length: 100 }),
  Email: varchar("Email", { length: 100 }).notNull(),
  MatKhau: varchar("MatKhau", { length: 255 }).notNull(),
  VaiTro: varchar("VaiTro", { length: 50 }),
  NgayTao: timestamp("NgayTao").defaultNow(),
  NgayCapNhat: timestamp("NgayCapNhat").defaultNow(),
});

export type User = {
  MaND: number;
  MaHS: string;
  Ten: string;
  Email: string;
  MatKhau: string;
  VaiTro: string;
  NgayTao: Date;
  NgayCapNhat: Date;
};
