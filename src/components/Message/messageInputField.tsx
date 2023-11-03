"use client";
import { useState } from "react";
import { BiUpArrowAlt } from "react-icons/bi";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";

import { db } from "@/firebase/config";
import { useAuthContext } from "@/context/authContext";

export default function MessageInputField({
  params,
  scrollToBottom,
}: {
  params: {
    thread_id: string;
  };
  scrollToBottom: () => void;
}) {
  const { user } = useAuthContext();
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    let newMessage = message.trim();
    if (newMessage === "") return;

    try {
      const userRef = doc(db, "users", user?.uid || "");
      await addDoc(collection(db, `threads`, params.thread_id, "messages"), {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: userRef,
      });

      setMessage("");
      scrollToBottom();
    } catch (err) {
      console.log(err);
      alert("something went wrong while sending your message");
    }
  };

  const handleClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code == "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="bg-background fixed w-full bottom-20 left-0 py-3">
      <div className="flex w-11/12 gap-2 mx-auto rounded-3xl">
        <input
          type="text"
          id="messageInputField"
          name="messageInputField"
          placeholder="Write a message..."
          value={message}
          onKeyDownCapture={handleClick}
          onChange={e => setMessage(e.target.value)}
          className="w-full px-4 py-3 h-full outline-none border rounded-lg
          placeholder:text-xs placeholder:font-normal"
        />
        <button
          className="bg-accent text-2xl bg-text text-background p-2 rounded-lg"
          onClick={handleSendMessage}>
          <BiUpArrowAlt />
        </button>
      </div>
    </div>
  );
}
