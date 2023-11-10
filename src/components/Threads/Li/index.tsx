import clsx from "clsx";
import { memo } from "react";
import Link from "next/link";
import _debounce from "lodash/debounce";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import {
  BsBookmark,
  BsThreeDots,
  BsShare,
  BsBookmarkFill,
} from "react-icons/bs";

import { db } from "@/firebase/config";
import formatTimeSince from "@/helper/timeSince";
import { useAuthContext } from "@/context/authContext";

import { Thread } from "@/types/threads";
import { InAppLinks } from "@/types/links";

import UserInfo from "./UserInfo";
import toast from "react-hot-toast";

const ThreadLi = memo(function ThreadLi({
  thread,
  isList = true,
  className,
}: {
  thread: Thread;
  isList?: Boolean;
  className?: string;
}) {
  const { user } = useAuthContext();
  const isThreadBookMarked = !!user?.bookmarks?.some(
    th => th.uid === thread.uid
  );

  // const debounceBookMarkThread = useCallback(
  //   _debounce(bookMarkThread, 2000, {
  //     leading: true,
  //     trailing: false,
  //   }),
  //   []
  // );

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    if (isList)
      return (
        <li
          className={clsx(
            "border-y border-text/10 w-full text-text grid h-full p-3 gap-2",
            className
          )}>
          {children}
        </li>
      );

    return (
      <div
        className={clsx(
          "border-y border-text/10 w-full text-text grid h-full p-3 gap-2",
          className
        )}>
        <div className="grid h-full p-3 gap-2">{children}</div>
      </div>
    );
  };

  function handleCopyThreadURL() {
    console.log(thread);
    navigator.clipboard.writeText(
      `${window.location.host}/community/${thread.type}/${thread.uid}`
    );
    toast.success("Copied Thread URL successfully.");
  }

  async function bookMarkThread() {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const threadRef = doc(db, "threads", thread.uid);

    if (!isThreadBookMarked) {
      await updateDoc(userRef, {
        bookmarks: arrayUnion({
          uid: threadRef.id,
          ref: threadRef,
        }),
      });
    } else {
      await updateDoc(userRef, {
        bookmarks: arrayRemove({
          uid: threadRef.id,
          ref: threadRef,
        }),
      });
    }
  }

  return (
    <Wrapper>
      <div className="flex gap-3">
        <UserInfo user={thread.user} />
        <span className="text-text/40">
          {formatTimeSince(thread.createdAt.toDate())}
        </span>
      </div>
      <Link href={`${InAppLinks.commuinity}/${thread.type}/${thread.uid}`}>
        <h6 className="font-bold text-sm">{thread.title}</h6>
        <span className="line-clamp-2 text-text/40 text-xs">{thread.body}</span>
      </Link>
      <div className="flex gap-5">
        <button onClick={handleCopyThreadURL}>
          <BsShare />
        </button>
        <button onClick={bookMarkThread}>
          {isThreadBookMarked ? <BsBookmarkFill /> : <BsBookmark />}
        </button>
        <BsThreeDots />
      </div>
    </Wrapper>
  );
});
export default ThreadLi;
