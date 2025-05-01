// routes/user.ts
import { Router } from "express";
const router = Router();

router.get("/user", async (req, res) => {
  res.json({ message: "user route ok" });
});

export default router;
