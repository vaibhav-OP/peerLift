"use client";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  collection,
  getCountFromServer,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import {
  BsFillHouseFill,
  BsFillPersonFill,
  BsFillChatDotsFill,
  BsFillHouseDoorFill,
} from "react-icons/bs";

import { db } from "@/firebase/config";
import { InAppLinks } from "@/types/links";
import { useAuthContext } from "@/context/authContext";

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useAuthContext();

  const [pendingRequestsCount, setPendingRequestsCount] = useState<number>(0);

  useEffect(() => {
    if (!user) return;
    const notificationRef = collection(db, "users", user.uid, "notifications");
    const notificationQuery = query(
      notificationRef,
      where("type", "==", "friend-request")
    );

    const unsubscribe = onSnapshot(notificationQuery, snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "removed") {
          setPendingRequestsCount(count => count - 1);
        } else if (change.type === "added") {
          setPendingRequestsCount(count => count + 1);
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
          <Link href={InAppLinks.profile} className="relative">
            <BsFillPersonFill className="h-9 w-8 mx-auto" />
            {pendingRequestsCount >= 1 && (
              <span className="text-background bg-primary h-5 w-5 leading-5 text-xs text-center border-background border rounded-full absolute top-0 right-0">
                {pendingRequestsCount}
              </span>
            )}
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
}
