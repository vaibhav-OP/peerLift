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

import InboxItem from "./InboxItem";

export default function InboxList() {
  const { user } = useAuthContext();

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
    <div className="w-full h-full bg-background sm:max-w-xs absolute z-10  sm:relative  transition-transform">
      <ul className="px-5 bg-background">
        {chatroomList.map(chatroom => (
          <InboxItem key={chatroom.uid} chatroom={chatroom} />
        ))}
      </ul>
    </div>
  );
}
