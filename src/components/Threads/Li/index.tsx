import Link from "next/link";
import { getDoc } from "firebase/firestore";
import { memo, useEffect, useState } from "react";
import { BsFillBookmarkFill, BsThreeDots } from "react-icons/bs";

import { UserData } from "@/types/user";
import { Thread } from "@/types/threads";

const ThreadLi = memo(function ThreadLi({ thread }: { thread: Thread }) {
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    async function fetchUser() {
      const userSnap = await getDoc(thread.user);
      const userData = userSnap.data() as UserData;

      setUserData(userData);
    }
    fetchUser();
  }, []);
  return (
    <li className="border-b bg-primary/60 w-11/12 max-w-sm text-text rounded-2xl shadow-xl">
      <Link
        href={`${thread.type}/${thread.uid}`}
        className="grid h-full p-3 gap-2">
        <div>{userData?.displayName}</div>
        <div>
          <h6 className="font-bold text-lg line-clamp-4">{thread.title}</h6>
          <span className="line-clamp-2">{thread.body}</span>
        </div>
        <div className="flex justify-end gap-5">
          <BsThreeDots />
          <BsFillBookmarkFill />
        </div>
      </Link>
    </li>
  );
});

export default ThreadLi;
