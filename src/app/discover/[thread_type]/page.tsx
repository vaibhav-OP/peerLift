import Link from "next/link";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "@/firebase/config";
import { Thread, ThreadList } from "@/types/threads";
import CreateThreadModal from "@/components/CreateThreadModal";

async function fetchThreadData(threadType: string) {
  const threadQuery = query(
    collection(db, "threads"),
    orderBy("createdAt"),
    limit(25),
    where("type", "==", threadType)
  );
  const threadSnap = await getDocs(threadQuery);

  const threadsList: ThreadList = [];
  threadSnap.forEach(thread =>
    threadsList.push({ uid: thread.id, ...thread.data() } as Thread)
  );

  return threadsList;
}

export default async function DiscoverThreadsPage({
  params,
}: {
  params: {
    thread_type: string;
  };
}) {
  const threadsList = await fetchThreadData(decodeURI(params.thread_type));
  return (
    <>
      <CreateThreadModal threadtype={decodeURI(params.thread_type)} />
      <ul>
        {threadsList.map((thread, index) => (
          <li key={index} className="border-b">
            <Link href={`${params.thread_type}/${thread.uid}`}>
              <h6>{thread.title}</h6>
              {thread.body}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
