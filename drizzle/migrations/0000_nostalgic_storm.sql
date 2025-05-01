CREATE TABLE "Answers" (
	"MaCTL" serial PRIMARY KEY NOT NULL,
	"MaHS" integer,
	"MaDT" integer,
	"MaCH" integer,
	"MaLC" integer,
	"ThoiGianNop" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Choices" (
	"MaLC" serial PRIMARY KEY NOT NULL,
	"MaCH" integer,
	"NoiDungLC" varchar(255),
	"LaDAD" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "ExamQuestions" (
	"MaCHDT" serial PRIMARY KEY NOT NULL,
	"MaDT" integer,
	"MaCH" integer
);
--> statement-breakpoint
CREATE TABLE "ExamResults" (
	"MaKQ" serial PRIMARY KEY NOT NULL,
	"MaDT" integer,
	"MaHS" integer,
	"Diem" numeric(10, 2),
	"ThoiGianNop" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Exams" (
	"MaDT" serial PRIMARY KEY NOT NULL,
	"TieuDe" varchar(255),
	"MatKhau" varchar(255),
	"MaND" integer,
	"NgayTao" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Questions" (
	"MaCH" serial PRIMARY KEY NOT NULL,
	"NoiDungCH" varchar(5000),
	"MaND" integer,
	"NgayTao" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Users" (
	"MaND" serial PRIMARY KEY NOT NULL,
	"MaHS" varchar(50),
	"Ten" varchar(100),
	"Email" varchar(100) NOT NULL,
	"MatKhau" varchar(255) NOT NULL,
	"VaiTro" varchar(50),
	"NgayTao" timestamp DEFAULT now(),
	"NgayCapNhat" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_MaHS_Users_MaND_fk" FOREIGN KEY ("MaHS") REFERENCES "public"."Users"("MaND") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_MaDT_Exams_MaDT_fk" FOREIGN KEY ("MaDT") REFERENCES "public"."Exams"("MaDT") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_MaCH_Questions_MaCH_fk" FOREIGN KEY ("MaCH") REFERENCES "public"."Questions"("MaCH") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_MaLC_Choices_MaLC_fk" FOREIGN KEY ("MaLC") REFERENCES "public"."Choices"("MaLC") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Choices" ADD CONSTRAINT "Choices_MaCH_Questions_MaCH_fk" FOREIGN KEY ("MaCH") REFERENCES "public"."Questions"("MaCH") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ExamQuestions" ADD CONSTRAINT "ExamQuestions_MaDT_Exams_MaDT_fk" FOREIGN KEY ("MaDT") REFERENCES "public"."Exams"("MaDT") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ExamQuestions" ADD CONSTRAINT "ExamQuestions_MaCH_Questions_MaCH_fk" FOREIGN KEY ("MaCH") REFERENCES "public"."Questions"("MaCH") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ExamResults" ADD CONSTRAINT "ExamResults_MaDT_Exams_MaDT_fk" FOREIGN KEY ("MaDT") REFERENCES "public"."Exams"("MaDT") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ExamResults" ADD CONSTRAINT "ExamResults_MaHS_Users_MaND_fk" FOREIGN KEY ("MaHS") REFERENCES "public"."Users"("MaND") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Exams" ADD CONSTRAINT "Exams_MaND_Users_MaND_fk" FOREIGN KEY ("MaND") REFERENCES "public"."Users"("MaND") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_MaND_Users_MaND_fk" FOREIGN KEY ("MaND") REFERENCES "public"."Users"("MaND") ON DELETE no action ON UPDATE no action;