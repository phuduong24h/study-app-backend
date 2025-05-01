import "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: number;
        Email: string;
        VaiTro: string;
      };
    }
  }
}
