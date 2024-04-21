import express from 'express';
import { NextFunction, Request, Response } from 'express';
import { ConversationModel } from '../models/conversation';
import authenticateToken from '../utils/authenticateToken';
import { body, validationResult } from 'express-validator';
import mongoose from 'mongoose';
const router = express.Router();

// get all conversations

router.get('/', [
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const conversations = await ConversationModel.find().populate(
        'participants'
      );
      res.json(conversations);
    } catch (error: any) {
      console.log(error);
      res.status(400).json({
        message: error.message.toString(),
      });
    }
  },
]);

// get all conversations that the user is a part of

router.get('/user/:userId', [
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const participantId = req.params.userId;
      const conversations = await ConversationModel.find({
        participants: { $in: [participantId] },
      }).populate('participants');
      res.json(conversations);
    } catch (error: any) {
      console.log(error);
      res.status(400).json({
        message: error.message.toString(),
      });
    }
  },
]);

// get one specific conversation

router.get('/:id', [
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const conversation = await ConversationModel.findById(
        req.params.id
      );
      if (!conversation) {
        res.status(404).json({
          success: false,
          message: 'Conversation not found',
        });
        return;
      }
      res.json(conversation);
    } catch (error: any) {
      console.log(error);
      res.status(400).json({
        message: error.message.toString(),
      });
    }
  },
]);

// create new conversation

router.post('/create', [
  authenticateToken,
  body('title')
    .trim()
    .isLength({ max: 30 })
    .withMessage('Title cannot exceed 30 characters'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const conversation = req.body;
      const { title, participants } = conversation;

      const doesConversationAllReadyExist =
        await ConversationModel.findOne({
          title: title,
        });
      if (doesConversationAllReadyExist) {
        res.status(400).json({
          message: 'Conversation with this title already exists',
        });
        return;
      }

      const newConversation = await ConversationModel.create({
        title,
        participants,
      });

      await newConversation.populate('participants');

      res.status(200).json({
        success: true,
        message: 'Conversation created Successfully',
        conversation: newConversation,
      });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({
        message: error.message.toString(),
      });
    }
  },
]);

// add new user to conversation

router.put('/:conversationId/participants/add/:userId', [
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const conversationId = req.params.conversationId;
      const userId = req.params.userId;
      const userObjectId = new mongoose.Types.ObjectId(userId);

      const conversation = await ConversationModel.findById(
        conversationId
      );
      if (!conversation) {
        return res
          .status(404)
          .json({ message: 'Conversation not found' });
      }
      if (conversation.participants.includes(userObjectId)) {
        return res.status(400).json({
          message:
            'User is already a participant in the conversation',
        });
      }
      conversation.participants.push(userObjectId);
      await conversation.save();

      res.status(200).json({
        message: 'User added to the conversation successfully',
      });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({
        message: error.message.toString(),
      });
    }
  },
]);

// remove user from conversation

router.put('/:conversationId/participants/remove/:userId', [
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const conversationId = req.params.conversationId;
      const userId = req.params.userId;
      const userObjectId = new mongoose.Types.ObjectId(userId);

      const conversation = await ConversationModel.findById(
        conversationId
      );
      if (!conversation) {
        return res
          .status(404)
          .json({ message: 'Conversation not found' });
      }
      if (!conversation.participants.includes(userObjectId)) {
        return res.status(400).json({
          message: 'User is not participant in the conversation',
        });
      }

      conversation.participants = conversation.participants.filter(
        (item) => !item.equals(userObjectId)
      );
      await conversation.save();

      res.status(200).json({
        message: 'User removed to the conversation successfully',
      });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({
        message: error.message.toString(),
      });
    }
  },
]);

// delete conversation

router.delete(
  '/delete/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // id is the conversation to be deleted
    } catch (error) {
      next(error);
    }
  }
);

export default router;
