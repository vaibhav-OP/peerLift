"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "@/firebase/config";
import { UserData } from "@/types/user";
import Avatar from "@/components/Avatar";

export default function UserInfo({ user }: { user: string }) {
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    async function fetchUser() {
      try {
        const userRef = doc(db, "users", user);
        const userSnap = await getDoc(userRef);
        const fetchedUserData = {
          uid: userSnap.id,
          ...userSnap.data(),
        } as UserData;

        setUserData(fetchedUserData);
      } catch {
        setUserData(undefined);
      }
    }
    fetchUser();
  }, []);

  return (
    <>
      <Avatar
        width={32}
        height={32}
        className="w-8 h-8 object-cover object-center rounded-full"
        src={userData?.photoURL}
        name={userData?.displayName || ""}
        alt={`${userData?.displayName}'s avatar`}
      />
      <div>{userData?.displayName}</div>
    </>
  );
}
