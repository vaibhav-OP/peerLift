"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { UserData } from "@/types/user";
import Avatar from "@/components/Avatar";
import { db } from "@/firebase/config";

export default function UserInfo({ user }: { user: string }) {
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    async function fetchUser() {
      const userRef = doc(db, "users", user);
      const userSnap = await getDoc(userRef);
      const fetchedUserData = {
        uid: userSnap.id,
        ...userSnap.data(),
      } as UserData;

      setUserData(fetchedUserData);
    }
    fetchUser();
  }, []);

  return (
    <>
      <Avatar
        alt=""
        width={28}
        height={28}
        className="w-7 h-7 object-cover object-center rounded-full"
        src={userData?.photoURL as string}
      />
      <div>{userData?.displayName}</div>
    </>
  );
}
