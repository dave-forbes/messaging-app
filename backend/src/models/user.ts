import mongoose, { Schema } from 'mongoose';

interface User {
  username: string;
  password: string;
  avatar: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: '' },
    bio: { type: String, default: '' },
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', UserSchema);

export { UserModel, User };
