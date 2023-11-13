import { Timestamp } from "firebase/firestore";

export type Thread = {
  uid: string;
  body: string;
  title: string;
  type: string;
  user: string;
  createdAt: Timestamp;
};

export type ThreadList = Array<Thread>;
