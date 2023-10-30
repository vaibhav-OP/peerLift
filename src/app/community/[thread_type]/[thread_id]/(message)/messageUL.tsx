"use client";
import { db } from "@/firebase/config";
import {
  Timestamp,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

type Message = {
  uid: string;
  text: string;
  createdAt: Timestamp | null;
  user: { uid: string; displayName: string };
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
    <ul className="flex-grow overflow-x-auto">
      {messageList.map(message => (
        <li key={message.uid} className="border-b">
          <div className="font-bold">
            {message.user.displayName}{" "}
            <span className="font-normal">
              {message.createdAt?.toDate().toLocaleTimeString() ||
                new Date().toLocaleTimeString()}
            </span>
          </div>
          <div>{message.text}</div>
        </li>
      ))}
    </ul>
  );
}
