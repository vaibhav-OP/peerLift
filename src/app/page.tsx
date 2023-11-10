"use client";
import { signOut } from "firebase/auth";
import JournalSection from "./JournalSection";
import { auth } from "@/firebase/config";

export default function Home() {
  return (
    <>
      <button onClick={() => signOut(auth)}>logout</button>

      <JournalSection />
    </>
  );
}
