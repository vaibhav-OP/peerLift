import { Timestamp } from "firebase-admin/firestore";

export type JournalData = {
  body: string;
  title: string;
  createdAt: Timestamp;
};
