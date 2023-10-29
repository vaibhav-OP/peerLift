"use client";
import { db } from "@/firebase/config";
import { Thread, ThreadList } from "@/types/threads";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import ThreadLi from "../Threads/Li";

export default function ThreadsYouMightLike() {
  const [threadsList, setThreadsList] = useState<ThreadList>([]);

  useEffect(() => {
    const threadQuery = query(
      collection(db, "threads"),
      orderBy("createdAt"),
      limit(2)
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
  return (
    <section className="px-3">
      <h6 className="font-bold text-sm">Threads you might like</h6>
      <ul className="flex flex-wrap items-stretch justify-center sm:justify-start gap-6 py-4">
        {threadsList.map((thread, index) => (
          <ThreadLi thread={thread} key={index} />
        ))}
      </ul>
    </section>
  );
}
