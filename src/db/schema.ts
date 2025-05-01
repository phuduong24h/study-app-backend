import {
  pgTable,
  serial,
  varchar,
  integer,
  boolean,
  timestamp,
  primaryKey,
  foreignKey,
  numeric,
} from "drizzle-orm/pg-core";

// Bảng Users
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

// Bảng Questions
export const Questions = pgTable("Questions", {
  MaCH: serial("MaCH").primaryKey(),
  NoiDungCH: varchar("NoiDungCH", { length: 5000 }), // NVARCHAR(MAX)
  MaND: integer("MaND").references(() => Users.MaND),
  NgayTao: timestamp("NgayTao").defaultNow(),
});

// Bảng Choices
export const Choices = pgTable("Choices", {
  MaLC: serial("MaLC").primaryKey(),
  MaCH: integer("MaCH").references(() => Questions.MaCH),
  NoiDungLC: varchar("NoiDungLC", { length: 255 }),
  LaDAD: boolean("LaDAD").default(false),
});

// Bảng Exams
export const Exams = pgTable("Exams", {
  MaDT: serial("MaDT").primaryKey(),
  TieuDe: varchar("TieuDe", { length: 255 }),
  MatKhau: varchar("MatKhau", { length: 255 }),
  MaND: integer("MaND").references(() => Users.MaND),
  NgayTao: timestamp("NgayTao").defaultNow(),
});

// Bảng ExamQuestions
export const ExamQuestions = pgTable("ExamQuestions", {
  MaCHDT: serial("MaCHDT").primaryKey(),
  MaDT: integer("MaDT").references(() => Exams.MaDT),
  MaCH: integer("MaCH").references(() => Questions.MaCH),
});

// Bảng Answers
export const Answers = pgTable("Answers", {
  MaCTL: serial("MaCTL").primaryKey(),
  MaHS: integer("MaHS").references(() => Users.MaND),
  MaDT: integer("MaDT").references(() => Exams.MaDT),
  MaCH: integer("MaCH").references(() => Questions.MaCH),
  MaLC: integer("MaLC").references(() => Choices.MaLC),
  ThoiGianNop: timestamp("ThoiGianNop").defaultNow(),
});

// Bảng ExamResults
export const ExamResults = pgTable("ExamResults", {
  MaKQ: serial("MaKQ").primaryKey(),
  MaDT: integer("MaDT").references(() => Exams.MaDT),
  MaHS: integer("MaHS").references(() => Users.MaND),
  Diem: numeric("Diem", { precision: 10, scale: 2 }),
  ThoiGianNop: timestamp("ThoiGianNop").defaultNow(),
});
