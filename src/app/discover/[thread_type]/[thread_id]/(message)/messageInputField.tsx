"use client";
import { useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "@/firebase/config";
import { useAuthContext } from "@/context/authContext";

export default function MessageInputField({
  params,
}: {
  params: {
    thread_id: string;
  };
}) {
  const { user } = useAuthContext();
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    let newMessage = message.trim();
    if (newMessage === "") return;

    try {
      await addDoc(collection(db, `threads`, params.thread_id, "messages"), {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: {
          displayName: user?.displayName,
          uid: user?.uid,
        },
      });

      setMessage("");
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
    <div className="bg-white py-3">
      <div className="flex w-11/12 p-1 mx-auto bg-text/25 rounded-3xl">
        <input
          type="text"
          id="messageInputField"
          placeholder="Message..."
          name="messageInputField"
          value={message}
          onKeyDownCapture={handleClick}
          onChange={e => setMessage(e.target.value)}
          className="w-full px-3 h-full outline-none bg-transparent"
        />
        <button
          className="bg-accent text-xl text-white p-2 rounded-full"
          onClick={handleSendMessage}>
          <BiSolidSend />
        </button>
      </div>
    </div>
  );
}
