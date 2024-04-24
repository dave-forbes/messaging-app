import mongoose, { Schema } from 'mongoose';
import { Message } from './message';

interface Conversation {
  title: string;
  creator: string;
  participants: string[];
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new Schema({
  title: { type: String, required: true },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  participants: [
    { type: Schema.Types.ObjectId, ref: 'User', required: true },
  ],
  messages: [
    { type: Schema.Types.ObjectId, ref: 'Message', required: true },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ConversationModel = mongoose.model(
  'Conversation',
  ConversationSchema
);

export { ConversationModel, Conversation };
