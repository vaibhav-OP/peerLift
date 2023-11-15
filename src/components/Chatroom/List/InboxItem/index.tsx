import clsx from "clsx";
import Link from "next/link";
import { useMemo } from "react";
import { GoDotFill } from "react-icons/go";

import { Chatroom } from "@/types/chatroom";
import { InAppLinks } from "@/types/links";
import formatTimeSince from "@/helper/timeSince";
import { useAuthContext } from "@/context/authContext";
import UserInfo from "@/components/Threads/Li/UserInfo";

export default function InboxItem({
  chatroom,
  className,
}: {
  className?: string;
  chatroom: Chatroom;
}) {
  const { user } = useAuthContext();

  const receiverUid = chatroom.members.find(member => member != user?.uid);
  if (!receiverUid) return <div></div>;

  const hasReadMsg = chatroom.lastMessage?.readBy?.includes(user?.uid as string)

  return (
    <li className={clsx("border-b py-3 border-text/10 px-4", className)}>
      <Link href={`${InAppLinks.messages}/${chatroom.uid}`} className="flex">
        <div className="flex-grow">
          <div className="flex gap-3 mb-1 items-center text-xs font-bold">
            <div className="flex gap-3 items-center">
              <UserInfo user={receiverUid} />
            </div>
            <span className="text-text/40">
              {chatroom.lastMessage &&
                formatTimeSince(chatroom?.lastMessage?.createdAt.toDate())}
            </span>
          </div>
          <div
            className={clsx(
              "line-clamp-1 text-xs",
              !hasReadMsg && "font-semibold"
            )}>
            <div>
              {!!(chatroom.lastMessage?.createdBy === user?.uid) && (
                <span className="mr-1">You:</span>
              )}
              <span
                dangerouslySetInnerHTML={{
                  __html: chatroom?.lastMessage?.text as String,
                }}
              />
            </div>
          </div>
        </div>
        {!hasReadMsg && (
          <span className="h-fit my-auto text-primary">
            <GoDotFill />
          </span>
        )}
      </Link>
    </li>
  );
}
