import { pgTable, serial, integer } from "drizzle-orm/pg-core";
import { Exams } from "./Exams";
import { Questions } from "./Questions";

export const ExamQuestions = pgTable("ExamQuestions", {
  MaCHDT: serial("MaCHDT").primaryKey(),
  MaDT: integer("MaDT").references(() => Exams.MaDT),
  MaCH: integer("MaCH").references(() => Questions.MaCH),
});

export type ExamQuestion = {
  MaCHDT: number;
  MaDT: number;
  MaCH: number;
};
