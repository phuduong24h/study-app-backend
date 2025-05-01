import { Response, Request, Router } from "express";
import jwt from "jsonwebtoken";
import { Users } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { db } from "@/db"; // nếu dùng alias "@/db", hãy chắc alias này được khai báo trong `tsconfig.json`
import bcrypt from "bcrypt";

const authRouter = Router();

authRouter.post("/login", async (req: any, res: any) => {
  const { email, password } = req.body;

  const [user] = await db.select().from(Users).where(eq(Users.Email, email));

  if (!user) {
    return res.status(401).json({ message: "Sai email hoặc mật khẩu" });
  }

  const isMatch = await bcrypt.compare(password, user.MatKhau);
  if (!isMatch) {
    return res.status(401).json({ message: "Sai email hoặc mật khẩu" });
  }

  const token = jwt.sign(
    { userId: user.MaND, role: user.VaiTro },
    "secret-key",
    { expiresIn: "1h" }
  );

  res.json({ token, role: user.VaiTro });
});

authRouter.get("/role", (req: any, res: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(403).json({ message: "Không có quyền truy cập" });

  try {
    const decoded = jwt.verify(token, "secret-key") as any;
    res.json({ role: decoded.role });
  } catch {
    res.status(403).json({ message: "Token không hợp lệ" });
  }
});

authRouter.put("/change-role", async (req: any, res: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { newRole } = req.body;

  if (!token) {
    return res.status(403).json({ message: "Không có token" });
  }

  try {
    const decoded = jwt.verify(token, "secret-key") as {
      userId: number;
      role: string;
    };
    const userId = decoded.userId;

    await db
      .update(Users)
      .set({ VaiTro: newRole } as Partial<typeof Users._.columns>)
      .where(eq(Users.MaND, userId));

    const newToken = jwt.sign({ userId: userId, role: newRole }, "secret-key", {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Cập nhật vai trò thành công",
      role: newRole,
      token: newToken,
    });
  } catch (error) {
    console.error("Lỗi đổi vai trò:", error);
    return res.status(401).json({ message: "Token không hợp lệ" });
  }
});
type NewUser = typeof Users.$inferInsert;

authRouter.post("/register", async (req: any, res: any) => {
  const { email, password, ten, vaiTro } = req.body;

  if (!email || !password || !vaiTro) {
    return res.status(400).json({ message: "Thiếu thông tin đăng ký" });
  }

  try {
    const [existingUser] = await db
      .select()
      .from(Users)
      .where(eq(Users.Email, email));

    if (existingUser) {
      return res.status(409).json({ message: "Email đã tồn tại" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      Email: email,
      MatKhau: hashedPassword,
      Ten: ten || null,
      VaiTro: vaiTro,
      MaHS: null,
    } as NewUser;

    await db.insert(Users).values(newUser);

    return res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
});

export default authRouter;
