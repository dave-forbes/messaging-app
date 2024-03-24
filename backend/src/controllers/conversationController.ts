import express from "express";
import { NextFunction, Request, Response } from "express";
import { ConversationModel } from "../models/conversation";
const router = express.Router();

// get all conversations

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const conversations = await ConversationModel.find();
    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

// get one specific conversation

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const conversation = await ConversationModel.findById(req.params.id);
    res.json(conversation);
  } catch (error) {
    next(error);
  }
});

// create new conversation

router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);

// add new user to conversation

router.put(
  "/add/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // id is the user to be added
    } catch (error) {
      next(error);
    }
  }
);

// remove user from conversation

router.put(
  "/remove/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // id is the user to be removed
    } catch (error) {
      next(error);
    }
  }
);

// delete conversation

router.delete(
  "/delete/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // id is the conversation to be deteled
    } catch (error) {
      next(error);
    }
  }
);

export default router;
