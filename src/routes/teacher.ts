// routes/teacher.ts
import { Router, Request, Response, NextFunction } from "express";
import { db } from "../db";
import { authenticate } from "../middlewares/authenticate";
import { Choices, ExamQuestions, Exams, Questions } from "../models";

interface CreateClassRequest {
  classCode: string;
  password: string;
}

interface CreateExamRequest {
  title: string;
  password: string;
}

interface AddQuestionRequest {
  content: string;
}

interface AddChoiceRequest {
  questionId: number;
  content: string;
  isCorrect: boolean;
}

const teacherRouter = Router();

// Tạo lớp học mới
teacherRouter.post(
  "/create-class",
  authenticate,
  async (
    req: Request<{}, {}, CreateClassRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { classCode, password } = req.body;

    try {
      const [exam] = await db
        .insert(Exams)
        .values({
          TieuDe: `Đề thi lớp ${classCode}`,
          MatKhau: password,
          MaND: req.user!.userId,
        })
        .returning();

      res.status(201).json({ message: "Đã tạo lớp học và đề thi", exam });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Tạo đề thi mới
teacherRouter.post(
  "/create-exam",
  authenticate,
  async (
    req: Request<{}, {}, CreateExamRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { title, password } = req.body;

    try {
      const [exam] = await db
        .insert(Exams)
        .values({ TieuDe: title, MatKhau: password, MaND: req.user!.userId })
        .returning();

      res.status(201).json({ exam });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Thêm câu hỏi
teacherRouter.post(
  "/add-question",
  authenticate,
  async (
    req: Request<{}, {}, AddQuestionRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { content } = req.body;

    try {
      const [question] = await db
        .insert(Questions)
        .values({ NoiDungCH: content, MaND: req.user!.userId })
        .returning();

      res.status(201).json({ question });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Thêm đáp án cho câu hỏi
teacherRouter.post(
  "/add-choice",
  authenticate,
  async (
    req: Request<{}, {}, AddChoiceRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { questionId, content, isCorrect } = req.body;

    try {
      const [choice] = await db
        .insert(Choices)
        .values({ MaCH: questionId, NoiDungLC: content, LaDAD: isCorrect })
        .returning();

      res.status(201).json({ choice });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

interface AddQuestionToClassRequest {
  classCode: number; // Chính là MaDT của đề thi
  content: string;
  choices: {
    content: string;
    isCorrect: boolean;
  }[];
}

teacherRouter.post(
  "/add-question-to-class",
  authenticate,
  async (
    req: Request<{}, {}, AddQuestionToClassRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { classCode, content, choices } = req.body;

    try {
      // 1. Thêm câu hỏi vào bảng Questions
      const [question] = await db
        .insert(Questions)
        .values({ NoiDungCH: content, MaND: req.user!.userId })
        .returning();

      // 2. Thêm các đáp án vào bảng Choices
      await db.insert(Choices).values(
        choices.map((choice) => ({
          MaCH: question.MaCH,
          NoiDungLC: choice.content,
          LaDAD: choice.isCorrect,
        }))
      );

      // 3. Gán câu hỏi vào đề thi (lớp học)
      await db.insert(ExamQuestions).values({
        MaDT: classCode,
        MaCH: question.MaCH,
      });

      res
        .status(201)
        .json({ message: "Đã thêm câu hỏi vào lớp học", question });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

export default teacherRouter;
