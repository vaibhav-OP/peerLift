"use client";
import { initializeChatroomStore } from "@/states/initializeChatroom";

export default function MessagePage() {
  return (
    <>
      messages
      <button onClick={() => (initializeChatroomStore.isOpen = true)}>
        test
      </button>
    </>
  );
}
