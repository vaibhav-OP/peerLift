"use client";
import { useEffect } from "react";

import { useMobileNavigation } from "@/context/mobileNavigation";
import { BsFillChatDotsFill } from "react-icons/bs";

export default function MessagePage() {
  const { openMobileNav } = useMobileNavigation();

  // opens the navbar by default
  useEffect(() => {
    if (openMobileNav) openMobileNav();
  }, [openMobileNav]);
  return (
    <div className="flex justify-center items-center flex-col h-full gap-3 text-center">
      <BsFillChatDotsFill className="text-8xl w-24 h-24 stroke-text stroke-1 overflow-visible text-background" />
      <div>
        <h1 className="font-semibold text-2xl">Your messages</h1>
        <span>Message anyone anonymously</span>
      </div>
      <button className="w-full max-w-[164px] py-2 text-center font-semibold rounded-full bg-primary text-background">
        Send Message
      </button>
    </div>
  );
}
