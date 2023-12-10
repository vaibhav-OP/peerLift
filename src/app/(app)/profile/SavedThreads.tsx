"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "@/firebase/config";
import { Thread } from "@/types/threads";
import { ThreadUl } from "@/components/Threads";
import { useAuthContext } from "@/context/authContext";

export default function SavedThreads() {
  const { user } = useAuthContext();
  const [threadsList, setThreadsList] = useState<Thread[]>([]);

  useEffect(() => {
    async function fetchSavedThreads() {
      if (!user || !user.bookmarks) return;
      const savedThreads: Thread[] = [];

      await Promise.all(
        user.bookmarks.map(async bookmark => {
          const threadRef = doc(db, "threads", bookmark);

          const threadSnap = await getDoc(threadRef);
          if (!threadSnap.exists()) return;

          savedThreads.push({
            uid: threadSnap.id,
            ...threadSnap.data(),
          } as Thread);
        })
      );

      setThreadsList(savedThreads);
    }
    fetchSavedThreads();
  }, [user]);

  return <ThreadUl threadsList={threadsList} />;
}
