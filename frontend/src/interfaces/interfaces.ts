export interface MessageI {
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: Date;
  image?: File;
}

export interface UserI {
  username: string;
  password: string;
  bio?: string;
  token?: string;
  _id?: string;
  avatar?: string;
}

export interface ConversationI {
  title: string;
  participants: UserI[];
  createdAt: Date;
  updatedAt: Date;
  _id: string;
  creator?: UserI;
}
