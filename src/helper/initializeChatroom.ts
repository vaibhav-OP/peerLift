"use client";
import {
  limit,
  query,
  where,
  addDoc,
  getDocs,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/config";

const initializeChatroom = async (senderUid: string, receiverUid: string) => {
  const members = [senderUid, receiverUid];
  members.sort();

  const chatroomRef = collection(db, "chatrooms");
  const chatroomQuery = query(
    chatroomRef,
    where("members", "==", members),
    limit(1)
  );

  const chatroomSnapshot = await getDocs(chatroomQuery);

  if (!chatroomSnapshot.empty) {
    return chatroomSnapshot.docs[0].id;
  } else {
    const chatroom = await addDoc(chatroomRef, {
      createdAt: serverTimestamp(),
      members: members,
    });
    return chatroom.id;
  }
};

export { initializeChatroom };
