import express from "express";
import { NextFunction, Request, Response } from "express";
import { MessageModel } from "../models/message";
const router = express.Router();

// get all messages for a specifc conversation

router.get(
  "/:conversationId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const conversationId = req.params.conversationId;
      const messages = await MessageModel.find({
        conversationId: conversationId,
      }).populate("sender");
      res.json(messages);
    } catch (error) {
      next(error);
    }
  }
);

// create new message

// TODO add validation and error handling

router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const messageData = req.body;
      const { conversationId, sender, content } = messageData;
      const newMessage = await MessageModel.create({
        conversationId,
        sender,
        content,
      });

      res.status(200).json({
        success: true,
        message: " Message created successfully",
        newMessage: newMessage,
      });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({
        message: error.message.toString(),
      });
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
