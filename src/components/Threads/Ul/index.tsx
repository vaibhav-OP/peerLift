import clsx from "clsx";

import { ThreadLi } from "..";
import { Thread } from "@/types/threads";

export default function ThreadUl({
  className,
  threadsList,
}: {
  className?: string;
  threadsList: Thread[] | undefined;
}) {
  return (
    <ul
      className={clsx("flex flex-col items-stretch justify-center", className)}>
      {threadsList === undefined || threadsList.length < 1
        ? "nothing here"
        : threadsList.map(thread => (
            <ThreadLi thread={thread} key={thread.uid} />
          ))}
    </ul>
  );
}
