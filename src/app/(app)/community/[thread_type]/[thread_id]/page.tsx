"use client";
import Error from "next/error";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "@/firebase/config";
import { Thread } from "@/types/threads";
import { ThreadLi } from "@/components/Threads";
import { MessageUI } from "@/components/Message";

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

      if (threadSnap.exists()) {
        const threadData = threadSnap.data() as Thread;
        setThreadData(threadData);
      } else {
        setThreadData(null);
      }
    }
    fetchThread();
  }, []);

  if (threadData === undefined) return <div>loading</div>;
  if (threadData === null) return <Error statusCode={404} />;
  return (
    <div className="pb-[69px]">
      <ThreadLi
        isList={false}
        thread={threadData}
        className="sticky top-16 left-0 bg-background z-10"
      />
      <MessageUI params={params} />
    </div>
  );
}
