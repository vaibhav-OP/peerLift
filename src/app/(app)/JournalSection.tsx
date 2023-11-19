import Link from "next/link";
import { BsFillCalendarFill } from "react-icons/bs";

import { InAppLinks } from "@/types/links";

export default function JournalSection() {
  return (
    <section className="px-5 sm:px-8 border-t border-text/10 py-8 grid gap-6">
      <div className="w-full flex justify-between">
        <h6 className="font-bold text-base">How was your day?</h6>
        <Link
          href={InAppLinks.journal}
          className="flex justify-stretch items-center text-background h-full bg-text rounded-md gap-2 py-1 px-2 ">
          <span>
            <BsFillCalendarFill />
          </span>
          <div>{new Date().toLocaleDateString()}</div>
        </Link>
      </div>
      <Link
        href={`${InAppLinks.journal}/create`}
        className="text-background bg-text w-full py-3 rounded-full text-center text-base">
        Start Journaling
      </Link>
    </section>
  );
}
