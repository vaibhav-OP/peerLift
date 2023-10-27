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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="title"
        value={formData.title}
        onChange={handleFormFieldOnChange}
        required
      />
      <br />
      <textarea
        name="body"
        placeholder="body"
        value={formData.body}
        onChange={handleFormFieldOnChange}
        required
      />
      <br />
      <button type="submit">submit</button>
    </form>
  );
}
