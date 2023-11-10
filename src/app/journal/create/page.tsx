"use client";
import toast from "react-hot-toast";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "@/firebase/config";
import { InAppLinks } from "@/types/links";
import { TextHeader } from "@/components/Header";
import { useAuthContext } from "@/context/authContext";

export default function CreateJournalPage() {
  const router = useRouter();
  const { user } = useAuthContext();

  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handlePostJournal = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    const journalRef = collection(db, "users", user?.uid, "journals");
    const journalSnap = addDoc(journalRef, {
      title: title.trim(),
      body: body.trim(),
      createdAt: serverTimestamp(),
    });

    toast.promise(journalSnap, {
      loading: "saving journal...",
      success: () => {
        router.push(InAppLinks.journal);
        return "journal created succesfully";
      },
      error: () => {
        setLoading(false);
        return "something went wrong";
      },
    });
  };

  return (
    <>
      <TextHeader heading="Post Journal" />
      <section
        className="px-5 sm:px-8 border-t border-text/10 py-3"
        onSubmit={handlePostJournal}>
        <h6 className="text-center text-base font-bold">
          What’s on your mind?
        </h6>

        <form className="w-full h-full flex flex-col gap-3 mt-3">
          <input
            type="text"
            name="title"
            placeholder="title"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="bg-secondary placeholder:text-text/60 py-5 px-8 rounded-2xl outline-none"
          />
          <br />
          <textarea
            name="body"
            placeholder="Start Journaling......"
            className="bg-secondary placeholder:text-text/60 h-80 py-5 px-8 rounded-2xl outline-none flex-grow"
            value={body}
            onChange={e => setBody(e.target.value)}
          />
          <br />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-text text-background text-xl px-6 py-2 rounded-full disabled:bg-text/40">
            Log Journal
          </button>
        </form>
      </section>
    </>
  );
}
