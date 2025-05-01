import { Router, Request, Response } from "express";
import { db } from "../db";
import { eq } from "drizzle-orm";
import {
  Answers,
  Choices,
  ExamQuestions,
  ExamResults,
  Exams,
  Questions,
} from "../db/schema";

// Định nghĩa kiểu cho body của request khi nhận answers
interface Answer {
  examId: number;
  questionId: number;
  choiceId: number;
}

const studentRouter = Router();

studentRouter.get("/exams/:classCode", async (req: any, res: any) => {
  const { classCode } = req.params;

  const [exam] = await db
    .select({
      MaDT: Exams.MaDT,
      TenDT: Exams.TieuDe,
    })
    .from(Exams)
    .where(eq(Exams.MaDT, Number(classCode)));

  if (!exam) {
    return res.status(404).json({ message: "Không tìm thấy đề thi" });
  }

  // Lấy các liên kết câu hỏi
  const examQuestions = await db
    .select()
    .from(ExamQuestions)
    .where(eq(ExamQuestions.MaDT, exam.MaDT));

  // Nếu không có câu hỏi liên kết
  if (examQuestions.length === 0) {
    return res.json({
      exam,
      questions: [],
      message: "Chưa có câu hỏi nào liên kết với đề thi này",
    });
  }

  // Truy vấn từng câu hỏi + đáp án
  const questions = await Promise.all(
    examQuestions.map(async (eqItem) => {
      if (eqItem.MaCH != null) {
        const [question] = await db
          .select()
          .from(Questions)
          .where(eq(Questions.MaCH, eqItem.MaCH));

        if (!question) return null;

        const choices = await db
          .select()
          .from(Choices)
          .where(eq(Choices.MaCH, eqItem.MaCH));

        return {
          question,
          choices,
        };
      }
      return null;
    })
  );

  const filteredQuestions = questions.filter((q) => q !== null);

  res.json({ exam, questions: filteredQuestions });
});

studentRouter.post("/answers/:id_student", async (req: any, res: any) => {
  const { id_student } = req.params;
  const { answers }: { answers: Answer[] } = req.body;

  if (!answers || answers.length === 0) {
    return res
      .status(400)
      .json({ message: "Không có câu trả lời nào trong request" });
  }

  try {
    // 1. Lưu câu trả lời
    await Promise.all(
      answers.map((answer) =>
        db.insert(Answers).values({
          MaHS: Number(id_student),
          MaDT: answer.examId,
          MaCH: answer.questionId,
          MaLC: answer.choiceId,
          ThoiGianNop: new Date(),
        })
      )
    );

    // 2. Tính điểm
    const firstAnswer = answers[0]; // Giả sử tất cả answer cùng examId
    const examId = firstAnswer.examId;

    // Lấy đáp án đúng
    const correctAnswers = await db
      .select({
        MaCH: Choices.MaCH,
        MaLC: Choices.MaLC,
      })
      .from(Choices)
      .where(eq(Choices.LaDAD, true));

    // Map để tra cứu nhanh
    const correctMap = new Map(
      correctAnswers.map((ca) => [`${ca.MaCH}`, ca.MaLC])
    );

    // So sánh câu trả lời
    let score = 0;
    answers.forEach((answer) => {
      const correctChoiceId = correctMap.get(`${answer.questionId}`);
      if (correctChoiceId === answer.choiceId) {
        score += 1;
      }
    });

    // Tính điểm trên thang 10
    const totalQuestions = answers.length;
    const finalScore = (score / totalQuestions) * 10;

    // 3. Lưu kết quả
    await db.insert(ExamResults).values({
      MaHS: Number(id_student),
      MaDT: examId,
      Diem: finalScore,
      ThoiGianNop: new Date(),
    });

    // 4. Trả về kết quả
    res.status(201).json({
      message: "Đã lưu câu trả lời và tính điểm",
      score: finalScore,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi lưu câu trả lời hoặc tính điểm" });
  }
});

studentRouter.get(
  "/exam-results/:studentId",
  async (req: Request, res: Response) => {
    const { studentId } = req.params;

    const results = await db
      .select()
      .from(ExamResults)
      .where(eq(ExamResults.MaHS, Number(studentId)));

    res.json({ results });
  }
);

export default studentRouter;
