"use client";

import clsx from "clsx";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from "react";

import { InAppLinks } from "@/types/links";
import { Chatroom } from "@/types/chatroom";
import UserInfo from "@/components/UserInfo";
import formatTimeSince from "@/helper/timeSince";
import { useAuthContext } from "@/context/authContext";

export default function InboxItem({
  chatroom,
  className,
}: {
  className?: string;
  chatroom: Chatroom;
}) {
  const { user } = useAuthContext();
  const [hasReadMsg, setHasReadMsg] = useState<boolean>();
  const [receiverUid, setReceiverUid] = useState<string>();

  useEffect(() => {
    setReceiverUid(chatroom.members.find(member => member != user?.uid));

    setHasReadMsg(chatroom.lastMessage?.readBy?.includes(user?.uid as string));
  }, [chatroom]);

  if (!receiverUid) return <div></div>;
  return (
    <li className={clsx("border-b py-3 border-text/10 px-4", className)}>
      <Link href={`${InAppLinks.messages}/${chatroom.uid}`} className="flex">
        <div className="flex-grow">
          <div className="flex gap-3 mb-1 text-xs font-bold">
            <div className="flex gap-2">
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
