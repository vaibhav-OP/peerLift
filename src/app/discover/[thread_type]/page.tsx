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
import { BsFillBookmarkFill, BsThreeDots } from "react-icons/bs";

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
      <ul className="flex flex-wrap items-start justify-center gap-6 p-6">
        {await Promise.all(
          threadsList.map(async (thread, index) => {
            const userSnap = await getDoc(thread.user);
            const userData = userSnap.data() as UserData;

            return (
              <li
                key={index}
                className="border-b bg-primary/60 w-11/12 max-w-sm text-text rounded-2xl shadow-xl">
                <Link
                  href={`${params.thread_type}/${thread.uid}`}
                  className="block h-full p-3 gap-3">
                  <h6 className="font-bold text-lg truncate">{thread.title}</h6>
                  <div className="text-base flex">
                    <span className="font-semibold gap-1">
                      {userData.displayName}:
                    </span>
                    <span className="line-clamp-3">{thread.body}</span>
                  </div>
                  <div className="flex justify-end gap-5">
                    <BsFillBookmarkFill />
                    <BsThreeDots />
                  </div>
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </>
  );
}
