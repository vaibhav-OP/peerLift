"use client";
import Error from "next/error";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "@/firebase/config";
import { Thread } from "@/types/threads";
import { ThreadLi } from "@/components/Threads";
import { MessageUI } from "@/components/Message";
import LoadingSkeleton from "@/components/LoadingScreen";

export default function ThreadPage({
  params,
}: {
  params: {
    thread_id: string;
  };
}) {
  const [threadData, setThreadData] = useState<Thread | undefined | null>(
    undefined
  );

  useEffect(() => {
    async function fetchThread() {
      const threadRef = doc(db, "threads", params.thread_id);
      const threadSnap = await getDoc(threadRef);

      if (threadSnap.exists() && !threadSnap.metadata.hasPendingWrites) {
        setThreadData({ uid: threadSnap.id, ...threadSnap.data() } as Thread);
      } else {
        setThreadData(null);
      }
    }
    fetchThread();
  }, [params.thread_id]);

  if (threadData === undefined) return <LoadingSkeleton />;
  if (threadData === null) return <Error statusCode={404} />;
  return (
    <>
      <ThreadLi
        isList={false}
        thread={threadData}
        className="top-16 left-0 bg-background z-10"
      />
      <MessageUI params={params} />
    </>
  );
}
