"use client";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { HiPencil } from "react-icons/hi";
import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { db } from "@/firebase/config";
import Avatar from "@/components/Avatar";
import { ProfileHeader } from "@/components/Header";
import { useAuthContext } from "@/context/authContext";
import LoadingSkeleton from "@/components/LoadingScreen";

const MyPosts = dynamic(() => import("./MyPosts"), {
  loading: () => <LoadingSkeleton />,
});
const Friends = dynamic(() => import("./(Friends)"), {
  loading: () => <LoadingSkeleton />,
});
const SavedThreads = dynamic(() => import("./SavedThreads"), {
  loading: () => <LoadingSkeleton />,
});

type CurrentSection = "My Posts" | "Friends" | "Saved";
const currentSectionList: CurrentSection[] = ["My Posts", "Friends", "Saved"];

export default function ProfilePage() {
  const { user } = useAuthContext();

  const [currentSection, setCurrentSection] =
    useState<CurrentSection>("My Posts");
  const [pendingRequestsCount, setPendingRequestsCount] = useState<number>(0);

  const UserProfileDetails = useMemo(
    () => (
      <div className="bg-text text-background flex flex-col justify-center items-center h-96 gap-3">
        <ProfileHeader />
        <Avatar
          width={112}
          height={112}
          src={user?.photoURL}
          name={user?.displayName || ""}
          alt={`${user?.displayName}'s avatar`}
          className="w-28 h-28 rounded-full"
        />

        <div className="flex gap-3">
          <div className="bg-transparent outline-none text-center text-3xl font-normal">
            {user?.displayName}
          </div>
          <button className="text-2xl">
            <HiPencil />
          </button>
        </div>
      </div>
    ),
    [user]
  );

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
    <>
      {UserProfileDetails}
      <section className="flex-grow flex flex-col">
        <div className="flex justify-between sm:justify-center sm:gap-16 px-8 py-5 text-lg font-semibold border-text/10 border-b">
          {currentSectionList.map(section => (
            <button
              key={section}
              onClick={() => setCurrentSection(section)}
              className={clsx(
                section === currentSection && "bg-text text-background",
                "px-3 py-2 rounded-full transition-all relative"
              )}>
              {section === "Friends" && pendingRequestsCount >= 1 && (
                <span className="text-background bg-primary h-5 w-5 leading-5 text-xs text-center border-background border rounded-full absolute -top-1 -right-1">
                  {pendingRequestsCount}
                </span>
              )}
              {section}
            </button>
          ))}
        </div>
        <section className="flex-grow flex flex-col">
          {
            {
              Saved: <SavedThreads />,
              Friends: <Friends pendingRequestsCount={pendingRequestsCount} />,
              "My Posts": <MyPosts />,
            }[currentSection]
          }
        </section>
      </section>
    </>
  );
}
