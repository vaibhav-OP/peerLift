"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/authContext";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";

import { db } from "@/firebase/config";
import { InAppLinks } from "@/types/links";

export default function CreateThreadForm({
  threadType,
}: {
  threadType: string;
}) {
  const route = useRouter();
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const handleFormFieldOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userRef = doc(db, "users", user?.uid || "");
      const newThread = await addDoc(collection(db, "threads"), {
        title: formData.title,
        body: formData.body,
        type: threadType,
        createdAt: serverTimestamp(),
        user: userRef,
      });

      route.push(`${InAppLinks.discover}/${threadType}/${newThread.id}`);
    } catch (error) {
      alert("something went wrong");
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-full flex flex-col gap-3">
      <input
        type="text"
        name="title"
        placeholder="title"
        value={formData.title}
        onChange={handleFormFieldOnChange}
        required
        className="bg-primary/80 placeholder:text-text/60 py-5 px-8 rounded-2xl outline-none"
      />
      <br />
      <textarea
        name="body"
        placeholder="body"
        value={formData.body}
        onChange={handleFormFieldOnChange}
        className="bg-primary/80 placeholder:text-text/60 max-h-96 py-5 px-8 rounded-2xl outline-none flex-grow"
      />
      <br />
      <button
        type="submit"
        className="bg-secondary text-background text-xl px-6 py-2 rounded-full">
        Post
      </button>
    </form>
  );
}
