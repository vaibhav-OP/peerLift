import { InterestArray } from "@/components/Forms/Registration/types";

export interface UserData {
  displayName: string;
  photoURL: string;
  gender: string;
  bio: string;
  interests: InterestArray;
  age: string;
}
