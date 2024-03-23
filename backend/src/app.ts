import express, { Request, Response, NextFunction } from "express";
import connectDB from "./database";

const app = express();

// connect to db

connectDB().catch(console.dir);

// generic error handling

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).json({ message: "Internal Server Error" });
});

export default app;
