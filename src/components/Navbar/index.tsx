"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BsFillHouseFill,
  BsFillPersonFill,
  BsFillChatDotsFill,
  BsFillHouseDoorFill,
} from "react-icons/bs";

import { InAppLinks } from "@/types/links";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="bg-background sm:-translate-y-[1px]">
      <ul
        className="flex w-full justify-between border-t border-text/25
                  text-sm font-bold px-4 h-[76px]
                 sm:border-r sm:border-t-0 sm:gap-12 sm:justify-center
                 sm:flex-col sm:w-fit sm:h-full sm:text-center">
        <li
          className={clsx(
            "flex items-center sm:block",
            pathname == InAppLinks.home && "text-primary"
          )}>
          <Link href={InAppLinks.home}>
            <BsFillHouseFill className="h-9 w-8 mx-auto" />
            Home
          </Link>
        </li>
        <li
          className={clsx(
            "flex items-center sm:block",
            pathname.includes(InAppLinks.discover) && "text-primary"
          )}>
          <Link href={InAppLinks.discover}>
            <BsFillHouseDoorFill className="h-9 w-8 mx-auto" />
            Discover
          </Link>
        </li>
        <li
          className={clsx(
            "flex items-center sm:block",
            pathname.includes(InAppLinks.messages) && "text-primary"
          )}>
          <Link href={InAppLinks.messages}>
            <BsFillChatDotsFill className="h-9 w-8 mx-auto" />
            Messages
          </Link>
        </li>
        <li
          className={clsx(
            "flex items-center sm:block",
            pathname.includes(InAppLinks.profile) && "text-primary"
          )}>
          <Link href={InAppLinks.profile}>
            <BsFillPersonFill className="h-9 w-8 mx-auto" />
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
}
