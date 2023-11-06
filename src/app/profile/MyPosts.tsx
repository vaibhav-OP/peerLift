"use client";
import { useEffect, useState } from "react";
import { collection, doc, getDocs, query, where } from "firebase/firestore";

import { db } from "@/firebase/config";
import { Thread } from "@/types/threads";
import { useAuthContext } from "@/context/authContext";
import { ThreadUl } from "@/components/Threads";

export default function MyPosts() {
  const { userData } = useAuthContext();
  const [threadsList, setThreadsList] = useState<Thread[]>();

  useEffect(() => {
    async function fetchThreads() {
      if (!userData) return;
      const userRef = doc(db, "users", userData?.uid);
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
