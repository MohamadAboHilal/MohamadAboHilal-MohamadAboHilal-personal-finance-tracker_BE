import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { CustomRequest } from "../types/reqBody";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

interface JwtPayload {
  userId: string;
}

export const authenticate = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    next(new Error("Authorization header missing or invalid format"));
  } else {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      req.reqBody = decoded.userId;
      next();
    } catch {
      next(new Error("Invalid or expired token"));
    }
  }
};
