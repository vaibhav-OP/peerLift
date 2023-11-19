"use client";
import { signOut } from "firebase/auth";

import { auth } from "@/firebase/config";
import JournalSection from "./JournalSection";

export default function Home() {
  return (
    <>
      <button onClick={() => signOut(auth)}>logout</button>
      <JournalSection />
    </>
  );
}
