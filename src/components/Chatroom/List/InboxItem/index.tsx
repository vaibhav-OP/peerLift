import Link from "next/link";

import { Chatroom } from "@/types/chatroom";
import { InAppLinks } from "@/types/links";
import formatTimeSince from "@/helper/timeSince";
import { useAuthContext } from "@/context/authContext";
import UserInfo from "@/components/Threads/Li/UserInfo";
import clsx from "clsx";

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
  return (
    <Link href={`${InAppLinks.messages}/${chatroom.uid}`}>
      <li className={clsx("border-b py-3 px-6 border-text/10", className)}>
        <div className="flex justify-between items-center text-xs font-bold">
          <div className="flex gap-3 items-center">
            <UserInfo user={receiverUid} />
          </div>
          <span className="text-text/40">
            {formatTimeSince(chatroom?.createdAt.toDate())}
          </span>
        </div>
        <div
          className="line-clamp-3 text-xs"
          dangerouslySetInnerHTML={{ __html: chatroom?.lastMessage as String }}
        />
      </li>
    </Link>
  );
}
