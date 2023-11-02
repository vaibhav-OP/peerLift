"use client";
import Error from "next/error";
import { doc, getDoc } from "firebase/firestore";

import { db } from "@/firebase/config";
import { Thread } from "@/types/threads";
import { ThreadLi } from "@/components/Threads";
import { MessageInputField, MessageUl } from "@/components/Message";
import { useEffect, useState } from "react";

async function fetchThreadData(threadId: string): Promise<Thread | undefined> {
  const threadRef = doc(db, "threads", threadId);
  const threadSnap = await getDoc(threadRef);

  if (threadSnap.exists()) {
    return (await threadSnap.data()) as Thread;
  } else {
    return undefined;
  }
}

export default async function threadPage({
  params,
}: {
  params: {
    thread_id: string;
  };
}) {
  const [threadData, setThreadData] = useState<Thread>();

  useEffect(() => {
    async function fetchThread() {
      const threadData = await fetchThreadData(params.thread_id);
      setThreadData(threadData);
    }
    fetchThread();
  }, []);

  if (!threadData) return <Error statusCode={404} />;
  return (
    <div className="pb-[69px]">
      <ThreadLi
        isList={false}
        thread={threadData}
        className="sticky top-16 left-0 bg-background"
      />
      <MessageUl params={params} />
      <MessageInputField params={params} />
    </div>
  );
}
