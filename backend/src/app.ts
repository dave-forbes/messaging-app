import express, { Request, Response, NextFunction } from "express";
import { connectDB } from "./database";
import userRouter from "./controllers/userController";
import conversationRouter from "./controllers/conversationController";
import messageRouter from "./controllers/messageController";
import cors from "cors";
import corsOptions from "./utils/corsOptions";

const app = express();

// connect to db

connectDB().catch(console.dir);

// middleware

app.use(cors(corsOptions));
app.use(express.json({ limit: "3mb" }));
app.use(express.urlencoded({ limit: "3mb", extended: true }));
app.use(express.static("public"));

// routes

app.use("/users", userRouter);
app.use("/conversations", conversationRouter);
app.use("/messages", messageRouter);

// Handle preflight requests
app.options("*", cors(corsOptions));

// generic error handling

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).json({ message: "Internal Server Error" });
});

export default app;
