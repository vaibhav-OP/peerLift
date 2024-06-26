"use client";
import { useState } from "react";
import { BiUpArrowAlt } from "react-icons/bi";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

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
  const messageRef = collection(db, `threads`, params.thread_id, "messages");

  const handleSendMessage = async () => {
    if (!user) return;
    let newMessage = message.trim();
    if (newMessage === "") return;

    try {
      await addDoc(messageRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: user.uid,
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
    <div className="bg-background w-full py-3">
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
