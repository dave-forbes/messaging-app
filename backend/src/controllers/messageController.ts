import express from "express";
import { NextFunction, Request, Response } from "express";
import { MessageModel } from "../models/message";
import { ConversationModel } from "../models/conversation";
import authenticateToken from "../utils/authenticateToken";
import { body, validationResult } from "express-validator";
const router = express.Router();

// get all messages for a specifc conversation

router.get(
  "/:conversationId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const conversationId = req.params.conversationId;
      const messages = await MessageModel.find({
        conversationId: conversationId,
      }).populate("senderId");
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
  authenticateToken,
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Message content is required")
    .isLength({ max: 50 })
    .withMessage("Message cannot exceed 50 characters"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const messageData = req.body;
      const { conversationId, senderId, content } = messageData;
      const newMessage = await MessageModel.create({
        conversationId,
        senderId,
        content,
      });

      const updatedConversation = await ConversationModel.findByIdAndUpdate(
        conversationId,
        {
          $push: { messages: newMessage._id },
          $set: { updatedAt: new Date() }, // Set the updatedAt field to the current date/time
        },
        { new: true }
      ).populate("participants");

      res.status(200).json({
        success: true,
        message: "Message created successfully",
        newMessage: newMessage,
        updatedConversation: updatedConversation, // Optionally, you can send back the updated conversation
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
