"use client";

import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { ThreadUl } from "@/components/Threads";
import { Thread, ThreadList } from "@/types/threads";

export default function ThreadsList({ threadType }: { threadType: string }) {
  const [threadsList, setThreadsList] = useState<ThreadList>([]);

  useEffect(() => {
    const threadQuery = query(
      collection(db, "threads"),
      orderBy("createdAt"),
      limit(25),
      where("type", "==", threadType)
    );

    const unsubscribe = onSnapshot(threadQuery, snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          setThreadsList(oldThreads => [
            { uid: change.doc.id, ...change.doc.data() } as Thread,
            ...oldThreads,
          ]);
        }

        if (change.type === "modified") {
          setThreadsList(oldMessages => {
            const messageIndex = oldMessages.findIndex(
              message => message.uid === change.doc.id
            );
            if (messageIndex === -1) return oldMessages;
            return [
              ...oldMessages.slice(0, messageIndex),
              { uid: change.doc.id, ...change.doc.data() },
              ...oldMessages.slice(messageIndex + 1),
            ] as ThreadList;
          });
        }

        if (change.type === "removed") {
          setThreadsList(oldThreads => {
            const updatedThreads = oldThreads.filter(
              thread => thread.uid !== change.doc.id
            );

            return updatedThreads;
          });
        }
      });
    });

    return () => unsubscribe();
  }, []);

  return <ThreadUl threadsList={threadsList} />;
}
