"use client";
import { useEffect, useRef, useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {
  query,
  orderBy,
  Timestamp,
  collection,
  onSnapshot,
  DocumentReference,
} from "firebase/firestore";

import { db } from "@/firebase/config";
import formatTimeSince from "@/helper/timeSince";
import UserInfo from "../Threads/Li/UserInfo";

type Message = {
  uid: string;
  text: string;
  createdAt: Timestamp | null;
  user: DocumentReference;
};

export default function MessageUl({
  params,
}: {
  params: {
    thread_id: string;
  };
}) {
  const [messageList, setMessageList] = useState<Message[]>([]);

  useEffect(() => {
    const messageQuery = query(
      collection(db, "threads", params.thread_id, "messages"),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(messageQuery, snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          setMessageList(oldMessages => [
            ...oldMessages,
            { uid: change.doc.id, ...change.doc.data() } as Message,
          ]);
        }

        if (change.type === "modified") {
          setMessageList(oldMessages => {
            const messageIndex = oldMessages.findIndex(
              message => message.uid === change.doc.id
            );

            if (messageIndex === -1) return oldMessages;

            return [
              ...oldMessages.slice(0, messageIndex),
              { uid: change.doc.id, ...change.doc.data() },
              ...oldMessages.slice(messageIndex + 1),
            ] as Message[];
          });
        }

        if (change.type === "removed") {
          setMessageList(oldMessages => {
            const updatedMessages = oldMessages.filter(
              message => message.uid !== change.doc.id
            );

            return updatedMessages;
          });
        }
      });
    });

    return () => unsubscribe();
  }, []);
  return (
    <ul className="flex-grow overflow-y-auto h-full">
      {messageList.map(message => (
        <li
          key={message.uid}
          className="border-b py-3 px-6 flex border-text/10">
          <div className="flex-grow">
            <div className="flex gap-3">
              <UserInfo user={message.user} />
              <span className="text-text/40">
                {formatTimeSince(message.createdAt?.toDate() || new Date())}
              </span>
            </div>
            <div className="font-normal">{message.text}</div>
          </div>
          <div>
            <BiDotsHorizontalRounded className="text-lg font-bold" />
          </div>
        </li>
      ))}
    </ul>
  );
}
