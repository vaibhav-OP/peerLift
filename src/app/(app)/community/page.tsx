"use client";
import Link from "next/link";
import { useMemo } from "react";

import { InAppLinks } from "@/types/links";
import { LogoHeader } from "@/components/Header";
import { useAuthContext } from "@/context/authContext";
import InterestList from "@/components/Forms/Registration/interestList";
import Image from "next/image";

export default function CommunityPage() {
  const { user } = useAuthContext();

  const interestList = useMemo(() => {
    const userInterests = user?.interests?.sort();
    const sortedInterests = InterestList.toSorted(interest =>
      !userInterests?.includes(interest.name) ? 0 : 1
    );

    return sortedInterests;
  }, [user, InterestList]);

  return (
    <>
      <LogoHeader />
      <h1 className="font-bold text-xl py-6 text-center border-y border-text/10">
        Explore Communities
      </h1>
      <ul className="flex flex-col justify-center">
        {interestList.map(interest => (
          <li key={interest.name} className="py-4 border-y border-text/10">
            <Link
              href={`${InAppLinks.commuinity}/${interest.name}`}
              className="px-5 sm:px-8 h-full w-full flex gap-3 items-center">
              <Image
                width={48}
                height={48}
                unoptimized
                placeholder="blur"
                src={interest.icon}
                alt={`${interest.name}'s icon`}
                className="bg-secondary h-12 w-12 object-contain object-center rounded-full"
              />
              {interest.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
