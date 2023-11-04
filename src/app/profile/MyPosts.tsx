"use client";
import { useEffect, useState } from "react";

import { Thread } from "@/types/threads";
import { useAuthContext } from "@/context/authContext";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";
import { ThreadLi } from "@/components/Threads";

export default function MyPosts() {
  const { user } = useAuthContext();
  const [threadsList, setThreadsList] = useState<Thread[]>();

  useEffect(() => {
    async function fetchThreads() {
      if (!user) return;
      const userRef = doc(db, "users", user?.uid);
      const threadQuery = query(
        collection(db, "threads"),
        where("user", "==", userRef)
      );

      const threadSnap = await getDocs(threadQuery);

      const ThreadsList: Thread[] = [];
      threadSnap.forEach(doc => {
        ThreadsList.push({ uid: doc.id, ...doc.data() } as Thread);
      });
      console.log(ThreadsList);
      setThreadsList(ThreadsList);
    }
    fetchThreads();
  }, []);

  return (
    <ul>
      {threadsList === undefined || threadsList.length < 1
        ? "nothing here"
        : threadsList.map(thread => (
            <ThreadLi thread={thread} key={thread.uid} />
          ))}
    </ul>
  );
}
