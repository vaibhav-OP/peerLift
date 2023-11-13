import { Timestamp } from "firebase/firestore";

export type Chatroom = {
  uid: string;
  createdAt: Timestamp;
  members: string[];
};
