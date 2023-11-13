"use client";
import Link from "next/link";
import { useMemo } from "react";

import { InAppLinks } from "@/types/links";
import { LogoHeader } from "@/components/Header";
import { useAuthContext } from "@/context/authContext";
import InterestList from "@/components/Forms/Registration/interestList";

export default function CommunityPage() {
  const { user } = useAuthContext();

  const interestList = useMemo(() => {
    const userInterests = user?.interests?.sort();
    const filteredInterests = InterestList.filter(
      interest => !userInterests?.includes(interest)
    );

    return [...(userInterests || []), ...filteredInterests];
  }, []);

  return (
    <>
      <LogoHeader />
      <h1 className="font-bold text-xl py-6 text-center border-y border-text/10">
        Explore Communities
      </h1>
      <ul className="flex flex-col justify-center">
        {interestList.map(interest => (
          <li key={interest} className="py-4 border-y border-text/10">
            <Link
              href={`${InAppLinks.commuinity}/${interest}`}
              className="px-5 sm:px-8 h-full w-full flex gap-3 items-center">
              <div className="bg-secondary h-12 w-12 rounded-full" />
              {interest}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
