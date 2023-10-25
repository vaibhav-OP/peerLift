import { DocumentData, doc, getDoc } from "firebase/firestore";

import { db } from "@/firebase/config";

async function fetchThreadData(threadId: string) {
  const threadRef = doc(db, "threads", threadId);
  const threadSnap = await getDoc(threadRef);

  if (threadSnap.exists()) {
    return threadSnap.data();
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
  const threadData = await fetchThreadData(params.thread_id);

  return <div>{threadData?.title}</div>;
}
