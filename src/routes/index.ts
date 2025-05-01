import { Router } from "express";
import authRouter from "./auth";
import teacherRouter from "./teacher";
import studentRouter from "./student";

const router = Router();

router.use("/auth", authRouter);
router.use("/student", studentRouter);
router.use("/teacher", teacherRouter);

export default router;
