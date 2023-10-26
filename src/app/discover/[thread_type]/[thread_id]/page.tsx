import { doc, getDoc } from "firebase/firestore";

import { db } from "@/firebase/config";

import MessageUl from "./(message)/messageUL";
import MessageInputField from "./(message)/messageInputField";

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

  return (
    <div className="h-full flex flex-col">
      <div className="border-b-8">
        <h4 className="font-bold">{threadData?.title}</h4>
        <span>{threadData?.body}</span>
      </div>
      <MessageUl params={params} />
      <MessageInputField params={params} />
    </div>
  );
}
