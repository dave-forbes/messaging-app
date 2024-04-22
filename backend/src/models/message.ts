import mongoose, { Schema } from 'mongoose';

interface Message {
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: Date;
  image?: string;
}

const MessageSchema = new Schema({
  conversationId: {
    type: Schema.Types.ObjectId,
    ref: 'Conversation',
  },
  senderId: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  image: { type: String },
});

const MessageModel = mongoose.model('Message', MessageSchema);

export { MessageModel, Message };
