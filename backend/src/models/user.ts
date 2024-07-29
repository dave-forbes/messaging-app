import mongoose, { Schema } from 'mongoose';

interface User {
  username: string;
  password: string;
  avatar: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
  email: String;
  notificationsEnabled: Boolean;
}

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: '' },
    bio: { type: String, default: '' },
    email: { type: String, default: '' },
    notificationsEnabled: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', UserSchema);

export { UserModel, User };
