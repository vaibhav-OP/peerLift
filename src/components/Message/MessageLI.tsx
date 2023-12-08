import { BiDotsHorizontalRounded } from "react-icons/bi";

import { Message } from "./messageUI";
import UserInfo from "@/components/UserInfo";
import formatTimeSince from "@/helper/timeSince";
import { useMessageOptionsContext } from "@/context/messageOptionContext";

export default function MessageLI({ message }: { message: Message }) {
  const { openMessageOptionModal } = useMessageOptionsContext();

  return (
    <li className="border-t py-3 px-6 flex border-text/10">
      <div className="flex-grow">
        <div className="flex gap-2">
          <UserInfo user={message.user} />
          <span className="text-text/40">
            {formatTimeSince(message.createdAt?.toDate() || new Date())}
          </span>
        </div>
        <div className="font-normal">{message.text}</div>
      </div>
      <button onClick={() => openMessageOptionModal(message)}>
        <BiDotsHorizontalRounded className="text-lg font-bold" />
      </button>
    </li>
  );
}
