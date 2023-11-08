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
    <nav className="bg-background">
      <ul className="flex w-full justify-between fixed bg-background bottom-0 left-0 text-sm font-bold px-4 sm:px-12 py-3">
        <li
          className={clsx(
            "flex items-center sm:block",
            (pathname === InAppLinks.home ||
              pathname.startsWith(InAppLinks.journal)) &&
              "text-primary"
          )}>
          <Link href={InAppLinks.home}>
            <BsFillHouseFill className="h-9 w-8 mx-auto" />
            Home
          </Link>
        </li>
        <li
          className={clsx(
            "flex items-center sm:block",
            pathname.startsWith(InAppLinks.commuinity) && "text-primary"
          )}>
          <Link href={InAppLinks.commuinity}>
            <BsFillHouseDoorFill className="h-9 w-8 mx-auto" />
            Community
          </Link>
        </li>
        <li
          className={clsx(
            "flex items-center sm:block",
            pathname.startsWith(InAppLinks.messages) && "text-primary"
          )}>
          <Link href={InAppLinks.messages}>
            <BsFillChatDotsFill className="h-9 w-8 mx-auto" />
            Messages
          </Link>
        </li>
        <li
          className={clsx(
            "flex items-center sm:block",
            pathname.startsWith(InAppLinks.profile) && "text-primary"
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
