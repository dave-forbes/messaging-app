import express from 'express';
import { NextFunction, Request, Response } from 'express';
import { ConversationModel } from '../models/conversation';
import authenticateToken from '../utils/authenticateToken';
import { body, validationResult } from 'express-validator';
import mongoose, { ObjectId } from 'mongoose';
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
      })
        .populate('participants')
        .populate('creator');
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
      const { title, participants, creator } = conversation;

      const objID =
        mongoose.Types.ObjectId.createFromHexString(creator);

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
        creator: objID,
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

// add new user(s) to conversation

router.put('/:conversationId/participants/add/', [
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = req.body;
      const conversationId = req.params.conversationId;
      const objectIds = users.map(
        (user: { value: string; label: string }) =>
          new mongoose.Types.ObjectId(user.value)
      );

      const conversation = await ConversationModel.findById(
        conversationId
      );
      if (!conversation) {
        return res
          .status(404)
          .json({ message: 'Conversation not found' });
      }
      for (const objectId of objectIds) {
        conversation.participants.push(objectId);
      }

      await conversation.save();

      await conversation.populate('participants');

      res.status(200).json({
        message: 'User(s) added to the conversation successfully',
        updatedConversation: conversation,
      });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({
        message: error.message.toString(),
      });
    }
  },
]);

// remove user(s) from conversation

router.put('/:conversationId/participants/remove/', [
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = req.body;
      const conversationId = req.params.conversationId;
      const objectIds = users.map(
        (user: { value: string; label: string }) =>
          new mongoose.Types.ObjectId(user.value)
      );

      const conversation = await ConversationModel.findById(
        conversationId
      );
      if (!conversation) {
        return res
          .status(404)
          .json({ message: 'Conversation not found' });
      }

      for (const objectId of objectIds) {
        conversation.participants = conversation.participants.filter(
          (item) => !item.equals(objectId)
        );
      }

      if (conversation.participants.length === 0) {
        await ConversationModel.findByIdAndDelete(conversationId);
        return res.status(200).json({
          message: 'Conversation deleted successfully',
        });
      } else {
        await conversation.save();
      }

      await conversation.populate('participants');

      res.status(200).json({
        message: 'User removed from the conversation successfully',
        updatedConversation: conversation,
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
