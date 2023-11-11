import { Timestamp } from "firebase/firestore";

export type JournalData = {
  body: string;
  title: string;
  createdAt: Timestamp;
};
