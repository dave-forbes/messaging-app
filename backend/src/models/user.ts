import mongoose, { Schema } from "mongoose";

interface User {
  username: string;
  email: string;
  password: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

export { UserModel, User };
