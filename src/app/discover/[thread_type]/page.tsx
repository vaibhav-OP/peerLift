import Link from "next/link";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  getDoc,
} from "firebase/firestore";

import { db } from "@/firebase/config";
import { Thread, ThreadList } from "@/types/threads";
import CreateThreadModal from "@/components/CreateThreadModal";
import { UserData } from "@/types/user";
import Image from "next/image";

async function fetchThreadData(threadType: string) {
  const threadQuery = query(
    collection(db, "threads"),
    orderBy("createdAt"),
    limit(25),
    where("type", "==", threadType)
  );
  const threadSnap = await getDocs(threadQuery);

  const threadsList: ThreadList = [];
  threadSnap.forEach(async thread => {
    var threadData: Thread = { uid: thread.id, ...thread.data() } as Thread;
    threadsList.push(threadData);
  });

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
      <ul className="flex flex-wrap items-center justify-center gap-6 p-6 ">
        {await Promise.all(threadsList.map(async (thread, index) => {
          const userSnap = await getDoc(thread.user);
          const userData = userSnap.data() as UserData;

          return (
            <li
              key={index}
              className="border-b bg-primary w-11/12 max-w-sm text-text rounded-2xl self-stretch shadow-xl">
              <Link
                href={`${params.thread_type}/${thread.uid}`}
                className="block h-full p-3">
                <div className="flex gap-3">
                  <Image
                    src={userData.photoURL}
                    alt={userData.displayName}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="truncate">
                    <span className="font-medium">{userData.displayName}</span>
                    <h6 className="font-bold text-lg ">{thread.title}</h6>
                  </div>
                </div>
                <div className="line-clamp-3">{thread.body}</div>
              </Link>
            </li>
          );
        }))}
      </ul>
    </>
  );
}
