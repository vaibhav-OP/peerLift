"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

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

      const threadQuery = query(
        collection(db, "threads"),
        where("user", "==", user.uid)
      );

      const threadSnap = await getDocs(threadQuery);

      const ThreadsList: Thread[] = [];
      threadSnap.forEach(doc => {
        ThreadsList.push({ uid: doc.id, ...doc.data() } as Thread);
      });

      setThreadsList(ThreadsList);
    }
    fetchThreads();
  }, [user]);

  return <ThreadUl threadsList={threadsList} />;
}
