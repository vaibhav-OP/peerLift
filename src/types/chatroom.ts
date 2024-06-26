import { Timestamp } from "firebase/firestore";

export type Chatroom = {
  uid: string;
  members: string[];
  createdAt: Timestamp;
  lastMessage?: {
    text: string;
    createdAt: Timestamp;
    createdBy: string;
    readBy?: string[];
  };
};
