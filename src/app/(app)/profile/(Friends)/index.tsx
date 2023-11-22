"use client";
import clsx from "clsx";
import { useState } from "react";

import FriendList from "./FriendList";
import PendingRequests from "./PendingRequests";

export default function Friends({
  pendingRequestsCount,
}: {
  pendingRequestsCount: number;
}) {
  const [currentSection, setCurrentSection] = useState<"friends" | "pending">(
    "friends"
  );
  return (
    <>
      <div className="flex gap-3 px-8 py-2 text-base font-semibold border-text/10 border-b">
        <button
          onClick={() => setCurrentSection("friends")}
          className={clsx(
            "friends" === currentSection && "bg-text/10",
            "px-3 py-1 rounded-lg transition-all"
          )}>
          Friends
        </button>
        <button
          onClick={() => setCurrentSection("pending")}
          className={clsx(
            "pending" === currentSection && "bg-text/10",
            "px-3 py-1 rounded-lg transition-all relative"
          )}>
          {pendingRequestsCount >= 1 && (
            <span className="text-background bg-primary h-5 w-5 leading-5 text-xs text-center border-background border rounded-full absolute -top-2 -right-2">
              {pendingRequestsCount}
            </span>
          )}
          Pending
        </button>
      </div>
      <div>
        {
          {
            friends: <FriendList />,
            pending: <PendingRequests />,
          }[currentSection]
        }
      </div>
    </>
  );
}
