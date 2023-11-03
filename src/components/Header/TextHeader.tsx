"use client";
import { useRouter } from "next/navigation";

import { AiOutlineLeft } from "react-icons/ai";

export default function TextHeader({ heading }: { heading: string }) {
  const route = useRouter();
  return (
    <header className="py-5 px-5 sm:px-8 sticky top-0 left-0 bg-background z-50">
      <div className="flex gap-3 items-center text-text font-bold text-base">
        <button onClick={route.back}>
          <AiOutlineLeft className="text-2xl" />
        </button>
        <h3>{heading}</h3>
      </div>
    </header>
  );
}
