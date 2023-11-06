import { DocumentReference } from "firebase/firestore";
import { InterestArray } from "@/components/Forms/Registration/types";

export interface UserData {
  uid: string;
  displayName: string;
  photoURL: string;
  gender: string;
  bio: string;
  interests: InterestArray;
  age: string;
  bookmarks: {
    uid: string;
    ref: DocumentReference;
  }[];
}
