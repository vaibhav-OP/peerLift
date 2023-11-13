import { InterestArray } from "@/components/Forms/Registration/types";

export interface UserData {
  uid: string;
  bio?: string;
  age?: string;
  gender?: string;
  photoURL?: string;
  displayName?: string;
  bookmarks?: string[];
  interests?: InterestArray;
}
