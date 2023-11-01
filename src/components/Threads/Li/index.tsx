import Link from "next/link";
import { memo } from "react";
import { BsBookmark, BsThreeDots, BsShare } from "react-icons/bs";

import { Thread } from "@/types/threads";
import { InAppLinks } from "@/types/links";
import UserInfo from "./UserInfo";
import formatTimeSince from "@/helper/timeSince";

const ThreadLi = memo(function ThreadLi({ thread }: { thread: Thread }) {
  return (
    <li className="border-y border-text/10 w-full text-text">
      <Link
        href={`${InAppLinks.commuinity}/${thread.type}/${thread.uid}`}
        className="grid h-full p-3 gap-2">
        <div className="flex gap-3">
          <UserInfo user={thread.user} />
          <span className="text-text/40">
            {formatTimeSince(thread.createdAt.toDate())}
          </span>
        </div>
        <div>
          <h6 className="font-bold text-sm">{thread.title}</h6>
          <span className="line-clamp-2 text-text/40 text-xs">
            {thread.body}
          </span>
        </div>
        <div className="flex gap-5">
          <BsShare />
          <BsBookmark />
          <BsThreeDots />
        </div>
      </Link>
    </li>
  );
});

export default ThreadLi;
