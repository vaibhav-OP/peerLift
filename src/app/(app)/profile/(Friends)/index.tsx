"use client";
import clsx from "clsx";
import { useState } from "react";
import PendingRequests from "./PendingRequests";

export default function Friends() {
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
            "px-3 py-1 rounded-lg transition-all"
          )}>
          Pending
        </button>
      </div>
      <div>
        {
          {
            friends: <div>Friends</div>,
            pending: <PendingRequests />,
          }[currentSection]
        }
      </div>
    </>
  );
}
