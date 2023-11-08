"use client";
import { useEffect, useState } from "react";
import { getDocFromServer, DocumentReference } from "firebase/firestore";

import { UserData } from "@/types/user";
import Avatar from "@/components/Avatar";

export default function UserInfo({ user }: { user: DocumentReference }) {
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    async function fetchUser() {
      const userSnap = await getDocFromServer(user);
      const userData = userSnap.data() as UserData;

      setUserData(userData);
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
        src={userData?.photoURL}
      />
      <div>{userData?.displayName}</div>
    </>
  );
}
