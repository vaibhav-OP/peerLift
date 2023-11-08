"use client";
import { useEffect, useState } from "react";
import { collection, doc, getDocs, query, where } from "firebase/firestore";

import { db } from "@/firebase/config";
import { Thread } from "@/types/threads";
import { ThreadUl } from "@/components/Threads";
import { useAuthContext } from "@/context/authContext";

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

      setThreadsList(ThreadsList);
    }
    fetchThreads();
  }, []);

  return <ThreadUl threadsList={threadsList} />;
}
