import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Không có token" });
    return;
  }

  try {
    const secretKey = "secret-key";
    const decoded = jwt.verify(token, secretKey) as {
      userId: number;
      Email?: string;
      role: string;
    };

    req.user = {
      userId: decoded.userId,
      Email: decoded.Email || "",
      VaiTro: decoded.role,
    };

    next();
  } catch (error) {
    res.status(403).json({ message: "Token không hợp lệ" });
    return;
  }
};
