import clsx from "clsx";

import { ThreadLi } from "..";
import { Thread } from "@/types/threads";

export default function ThreadUl({
  className,
  threadsList,
  emptyListText,
}: {
  className?: string;
  emptyListText?: string;
  threadsList: Thread[] | undefined;
}) {
  return (
    <>
      {threadsList === undefined || threadsList.length < 1 ? (
        <div className="h-full flex">
          <span className="m-auto">
            {emptyListText ? emptyListText : "No Posts Yet"}
          </span>
        </div>
      ) : (
        <ul
          className={clsx(
            "flex flex-col items-stretch justify-center",
            className
          )}>
          {threadsList.map(thread => (
            <ThreadLi thread={thread} key={thread.uid} />
          ))}
        </ul>
      )}
    </>
  );
}
