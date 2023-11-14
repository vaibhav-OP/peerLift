import { InterestArray } from "@/components/Forms/Registration/types";
import { Timestamp } from "firebase/firestore";

export interface UserData {
  uid: string;
  bio?: string;
  dob?: Timestamp;
  gender?: string;
  photoURL?: string;
  displayName?: string;
  bookmarks?: string[];
  interests?: InterestArray;
}
