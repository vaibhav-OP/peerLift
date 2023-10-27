import { DocumentReference } from "firebase/firestore";

export type Thread = {
  uid: string;
  body: string;
  title: string;
  type: string;
  user: DocumentReference;
};

export type ThreadList = Array<Thread>;
