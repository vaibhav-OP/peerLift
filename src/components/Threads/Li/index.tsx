import clsx from "clsx";
import { memo } from "react";
import Link from "next/link";
import { BsBookmark, BsThreeDots, BsShare } from "react-icons/bs";

import { Thread } from "@/types/threads";
import { InAppLinks } from "@/types/links";
import formatTimeSince from "@/helper/timeSince";

import UserInfo from "./UserInfo";

const ThreadLi = memo(function ThreadLi({
  thread,
  isList = true,
  className,
}: {
  thread: Thread;
  isList?: Boolean;
  className?: string;
}) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    if (isList)
      return (
        <li
          className={clsx(
            "border-y border-text/10 w-full text-text",
            className
          )}>
          <Link
            href={`${InAppLinks.commuinity}/${thread.type}/${thread.uid}`}
            className="grid h-full p-3 gap-2">
            {children}
          </Link>
        </li>
      );

    return (
      <div
        className={clsx("border-y border-text/10 w-full text-text", className)}>
        <div className="grid h-full p-3 gap-2">{children}</div>
      </div>
    );
  };

  return (
    <Wrapper>
      <div className="flex gap-3">
        <UserInfo user={thread.user} />
        <span className="text-text/40">
          {formatTimeSince(thread.createdAt.toDate())}
        </span>
      </div>
      <div>
        <h6 className="font-bold text-sm">{thread.title}</h6>
        <span className="line-clamp-2 text-text/40 text-xs">{thread.body}</span>
      </div>
      <div className="flex gap-5">
        <BsShare />
        <BsBookmark />
        <BsThreeDots />
      </div>
    </Wrapper>
  );
});
export default ThreadLi;
