"use client";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/firebase/config";
import { Chatroom } from "@/types/chatroom";
import { useAuthContext } from "@/context/authContext";
import { useMobileNavigation } from "@/context/mobileNavigation";

import InboxItem from "./InboxItem";
import clsx from "clsx";

export default function InboxList() {
  const { user } = useAuthContext();
  const { isOpen } = useMobileNavigation();

  const [chatroomList, setChatroomList] = useState<Chatroom[]>([]);

  useEffect(() => {
    if (!user) return;
    const chatroomRef = collection(db, "chatrooms");
    const chatroomQuery = query(
      chatroomRef,
      orderBy("createdAt"),
      where("members", "array-contains", user.uid)
    );

    const unsubscribe = onSnapshot(chatroomQuery, async QuerySnapshot => {
      const updatedChatroomList: Chatroom[] = [];

      await Promise.all(
        QuerySnapshot.docs.map(async doc => {
          const chatroomData = { uid: doc.id, ...doc.data() } as Chatroom;
          updatedChatroomList.push(chatroomData);
        })
      );

      setChatroomList(updatedChatroomList);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <ul
      className={clsx(
        "px-5 bg-background w-full h-full sm:max-w-xs absolute z-10  sm:relative  transition-transform sm:border-r border-text/10",
        !isOpen && "-translate-x-full sm:translate-x-0"
      )}>
      {chatroomList.map(chatroom => (
        <InboxItem key={chatroom.uid} chatroom={chatroom} />
      ))}
    </ul>
  );
}
