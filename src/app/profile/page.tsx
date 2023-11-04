"use client";
import clsx from "clsx";
import { useState } from "react";
import { HiPencil } from "react-icons/hi";

import Avatar from "@/components/Avatar";
import { ProfileHeader } from "@/components/Header";
import { useAuthContext } from "@/context/authContext";
import MyPosts from "./MyPosts";

type CurrentSection = "My Posts" | "Friends" | "Saved";
const currentSectionList: CurrentSection[] = ["My Posts", "Friends", "Saved"];

export default function ProfilePage() {
  const { user } = useAuthContext();

  const [currentSection, setCurrentSection] =
    useState<CurrentSection>("My Posts");

  return (
    <>
      <div className="bg-text text-background flex flex-col justify-center items-center h-96 gap-3">
        <ProfileHeader />
        <Avatar
          src={user?.photoURL}
          alt={user?.displayName || ""}
          height={112}
          width={112}
          className="w-28 h-28 rounded-full"
        />
        <div className="flex gap-3">
          <h6 className="text-3xl font-normal">{user?.displayName}</h6>
          <button className="text-2xl">
            <HiPencil />
          </button>
        </div>
      </div>
      <div>
        <div className="flex justify-between sm:justify-center sm:gap-16 px-8 py-5 text-lg font-semibold border-text/10 border-b">
          {currentSectionList.map(section => (
            <button
              key={section}
              onClick={() => setCurrentSection(section)}
              className={clsx(
                section === currentSection && "bg-text text-background",
                "px-3 py-2 rounded-full transition-all"
              )}>
              {section}
            </button>
          ))}
        </div>
        <section>
          {
            {
              Saved: <div>Saved</div>,
              Friends: <div>Friends</div>,
              "My Posts": <MyPosts />,
            }[currentSection]
          }
        </section>
      </div>
    </>
  );
}
