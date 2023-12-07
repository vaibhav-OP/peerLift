import { Interests } from "@/components/Forms/Registration/types";
import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export interface UserData {
  uid: string;
  bio?: string;
  dob?: Timestamp;
  gender?: string;
  photoURL?: string;
  displayName?: string;
  bookmarks?: string[];
  interests?: Interests["name"][];
  registered: boolean;
  friendList?: string[];
}

export const mapUserToUserData = (firebaseUser: User): UserData => {
  return {
    registered: false,
    uid: firebaseUser.uid,
  };
};
