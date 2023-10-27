"use client";
import Link from "next/link";

import { InAppLinks } from "@/types/links";
import { useAuthContext } from "@/context/authContext";
import InterestList from "@/components/Forms/Registration/interestList";

export default function DiscoverPage() {
  const { user } = useAuthContext();
  const interestList = InterestList.sort(interest => {
    if (user?.interests.includes(interest)) return -1;
    return 0;
  });

  return (
    <ul className="flex flex-wrap gap-4 justify-center">
      {interestList.map(interest => (
        <li
          key={interest}
          className="w-44 h-44 shadow-2xl rounded-2xl bg-white overflow-hidden">
          <Link
            href={`${InAppLinks.discover}/${interest}`}
            className="h-full w-full block">
            {interest}
          </Link>
        </li>
      ))}
    </ul>
  );
}
