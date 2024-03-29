export interface MessageI {
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: Date;
}

export interface UserI {
  username: string;
  password: string;
  bio: string;
  token?: string;
  _id?: string;
}

export interface ConversationI {
  title: string;
  participants: UserI[];
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}
