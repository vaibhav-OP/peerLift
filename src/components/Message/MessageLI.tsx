import { BiDotsHorizontalRounded } from "react-icons/bi";

import { Message } from "./messageUI";
import UserInfo from "../Threads/Li/UserInfo";
import formatTimeSince from "@/helper/timeSince";

export default function MessageLI({ message }: { message: Message }) {
  return (
    <li className="border-t py-3 px-6 flex border-text/10">
      <div className="flex-grow">
        <div className="flex gap-3">
          <UserInfo user={message.user} />
          <span className="text-text/40">
            {formatTimeSince(message.createdAt?.toDate() || new Date())}
          </span>
        </div>
        <div className="font-normal">{message.text}</div>
      </div>
      <div>
        <BiDotsHorizontalRounded className="text-lg font-bold" />
      </div>
    </li>
  );
}
