import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "@/firebase/config";
import { Thread } from "@/types/threads";
import { ThreadUl } from "@/components/Threads";
import { useAuthContext } from "@/context/authContext";

export default function SavedThreads() {
  const { userData } = useAuthContext();
  const [threadsList, setThreadsList] = useState<Thread[]>();

  useEffect(() => {
    async function fetchSavedThreads() {
      if (!userData) return;
      const savedThreads: Thread[] = [];

      await Promise.all(
        userData.bookmarks.map(async bookmark => {
          const threadRef = doc(db, "threads", bookmark.uid);

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
  }, []);

  return <ThreadUl threadsList={threadsList} />;
}
