"use client";
import { useEffect, useRef, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { db } from "@/firebase/config";
import MessageLI from "@/components/Message/messageLI";
import { Message } from "@/components/Message/messageUI";

import ChatMessageInputField from "./MessageInput";

export default function ChatPage({
  params,
}: {
  params: {
    chat_id: string;
  };
}) {
  const bottomElementRef = useRef<HTMLSpanElement>(null);
  const [messageList, setMessageList] = useState<Message[]>([]);

  useEffect(() => {
    const messagesRef = collection(db, "chatrooms", params.chat_id, "messages");
    const messagesQuery = query(messagesRef, orderBy("createdAt"));

    const unsubscribe = onSnapshot(messagesQuery, async QuerySnapshot => {
      const updatedMessageList: Message[] = [];

      await Promise.all(
        QuerySnapshot.docs.map(doc => {
          const messageData = { uid: doc.id, ...doc.data() } as Message;
          updatedMessageList.push(messageData);
        })
      );

      setMessageList(updatedMessageList);
    });

    return () => {
      unsubscribe();
    };
  }, [params.chat_id]);

  const scrollToBottom = () => {
    if (!bottomElementRef.current) return;
    bottomElementRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <ul className="flex flex-col h-fit max-h-full mt-auto flex-grow overflow-y-auto pb-[69px] scrollbar-thin scrollbar-thumb-text/40">
        {messageList.map(message => (
          <MessageLI key={message.uid} message={message} />
        ))}
        <span ref={bottomElementRef} />
      </ul>
      <ChatMessageInputField
        chatId={params.chat_id}
        scrollToBottom={scrollToBottom}
      />
    </>
  );
}
