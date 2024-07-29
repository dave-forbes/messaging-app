export interface MessageI {
  conversationId: string;
  senderId: UserI;
  content: string;
  createdAt: string;
  image?: string;
  _id: string;
}

export interface UserI {
  username: string;
  password: string;
  bio?: string;
  token?: string;
  _id?: string;
  avatar?: string;
  email?: string;
  notificationsEnabled?: boolean;
}

export interface ConversationI {
  title: string;
  participants: UserI[];
  createdAt: Date;
  updatedAt: Date;
  _id: string;
  creator?: UserI;
}
