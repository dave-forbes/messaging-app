import mongoose, { Schema } from "mongoose";

interface Conversation {
  participants: string[]; // Array of user IDs participating in this conversation
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ConversationModel = mongoose.model("Conversation", ConversationSchema);

export { ConversationModel, Conversation };
