import express from 'express';
import { NextFunction, Request, Response } from 'express';
import { MessageModel } from '../models/message';
import { ConversationModel } from '../models/conversation';
import authenticateToken from '../utils/authenticateToken';
import { body, validationResult } from 'express-validator';
import { upload } from '../utils/multerSetup';
import randomImageName from '../utils/randomImageName';
import { addImageToS3, getImageUrl } from '../utils/s3Config';
import { User } from '../models/user';
const router = express.Router();

// get all messages for a specifc conversation

router.get(
  '/:conversationId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const conversationId = req.params.conversationId;
      const messages = await MessageModel.find({
        conversationId: conversationId,
      }).populate('senderId');

      for (const message of messages) {
        if (message.image) {
          const signedUrl = await getImageUrl(message.image);
          message.image = signedUrl;
        }
        const sender: any = message.senderId;
        if (sender.avatar && !sender.processed) {
          const signedUrl = await getImageUrl(sender.avatar);
          sender.avatar = signedUrl;
          sender.processed = true;
        }
      }
      res.json(messages);
    } catch (error) {
      next(error);
    }
  }
);

// create new message

router.post(
  '/create',
  authenticateToken,
  upload.single('image'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Message content is required')
    .isLength({ max: 500 })
    .withMessage('Message cannot exceed 500 characters'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const messageData = req.body;

      let imageName = '';

      if (req.file) {
        imageName = randomImageName();

        try {
          await addImageToS3(req.file, imageName);
        } catch (error) {
          console.error('Error uploading image to S3:', error);
          throw new Error('Failed to upload image to S3');
        }
      }

      const { conversationId, senderId, content } = messageData;
      const newMessage = await MessageModel.create({
        conversationId,
        senderId,
        content,
        image: imageName,
      });

      await newMessage.populate('senderId');

      if (imageName !== '') {
        const signedUrl = await getImageUrl(imageName);
        newMessage.image = signedUrl;
      }

      const sender: any = newMessage.senderId;
      if (sender.avatar) {
        const signedUrl = await getImageUrl(sender.avatar);
        sender.avatar = signedUrl;
      }

      res.status(200).json({
        success: true,
        message: 'Message created successfully',
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
  '/update/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);

// delete message

router.put(
  '/delete/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);

export default router;
