"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "@/firebase/config";
import { Chatroom } from "@/types/chatroom";
import { useAuthContext } from "@/context/authContext";

export default function InboxList() {
  const { user } = useAuthContext();
  const [chatroomList, setChatroomList] = useState<Chatroom[]>([]);

  useEffect(() => {
    async function fetchChatRooms() {
      if (!user) return;
      const chatroomRef = collection(db, "chatrooms");
      const chatroomQuery = query(
        chatroomRef,
        where("members", "array-contains", user.uid)
      );

      const chatroomSnapshot = await getDocs(chatroomQuery);

      const updatedChatroomList: Chatroom[] = [];

      chatroomSnapshot.forEach(doc => {
        updatedChatroomList.push({ uid: doc.id, ...doc.data() } as Chatroom);
      });

      setChatroomList(updatedChatroomList);
    }
    fetchChatRooms();
  }, [user]);

  return (
    <div className="w-full sm:max-w-xs absolute sm:relative">
      <ul>
        {chatroomList.map(chatroom => (
          <li key={chatroom.uid}>{chatroom.uid} hey</li>
        ))}
      </ul>
    </div>
  );
}
