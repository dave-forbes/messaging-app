import express from "express";
import { NextFunction, Request, Response } from "express";
import { MessageModel } from "../models/message";
const router = express.Router();

// get all messages for a specifc conversation

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const messages = await MessageModel.find();
    res.json(messages);
  } catch (error) {
    next(error);
  }
});

// create new message

router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);

// update message

router.put(
  "/update/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);

// delete message

router.put(
  "/delete/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);

export default router;
