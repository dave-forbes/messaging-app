import mongoose, { Schema } from "mongoose";

interface Message {
  conversationId: string; // ID of the conversation this message belongs to
  sender: string; // ID of the user who sent the message
  content: string;
  createdAt: Date;
}

const MessageSchema = new Schema({
  conversationId: { type: Schema.Types.ObjectId, ref: "Conversation" },
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const MessageModel = mongoose.model("Message", MessageSchema);

export { MessageModel, Message };
