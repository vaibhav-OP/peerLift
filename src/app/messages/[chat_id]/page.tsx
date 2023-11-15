"use client";
import { AiOutlineLoading } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";

import { db } from "@/firebase/config";
import { MessageLI } from "@/components/Message";
import { Message } from "@/components/Message/messageUI";
import { useMobileNavigation } from "@/context/mobileNavigation";

import ChatMessageInputField from "./MessageInput";

export default function ChatPage({
  params,
}: {
  params: {
    chat_id: string;
  };
}) {
  const { closeMobileNav } = useMobileNavigation();
  const [messageList, setMessageList] = useState<Message[]>([]);

  const bottomElementRef = useRef<HTMLSpanElement>(null);
  const { ref: loadElementRef, inView } = useInView({
    delay: 1000,
    threshold: 1,
    initialInView: true,
  });

  useEffect(() => {
    const messagesRef = collection(db, "chatrooms", params.chat_id, "messages");
    const messagesQuery = query(
      messagesRef,
      orderBy("createdAt", "desc"),
      limit(15)
    );

    const unsubscribe = onSnapshot(messagesQuery, async querySnapshot => {
      const updatedMessageList: Message[] = [];

      await Promise.all(
        querySnapshot.docs.map(doc => {
          const messageData = { uid: doc.id, ...doc.data() } as Message;
          updatedMessageList.push(messageData);
        })
      );

      setMessageList(updatedMessageList);
      scrollToBottom();
    });

    if (closeMobileNav) closeMobileNav();

    return () => {
      unsubscribe();
    };
  }, [params.chat_id]);

  useEffect(() => {
    if (!inView) return;
    const messagesRef = collection(db, "chatrooms", params.chat_id, "messages");

    const startAfterMsg =
      messageList.length > 0
        ? messageList[messageList.length - 1].createdAt
        : null;

    const messagesQuery = query(
      messagesRef,
      orderBy("createdAt", "desc"),
      startAfter(startAfterMsg),
      limit(15)
    );

    const unsubscribe = onSnapshot(messagesQuery, async querySnapshot => {
      const updatedMessageList: Message[] = [];

      await Promise.all(
        querySnapshot.docs.map(doc => {
          const messageData = { uid: doc.id, ...doc.data() } as Message;
          updatedMessageList.push(messageData);
        })
      );

      setMessageList(prevMessageList => [
        ...prevMessageList,
        ...updatedMessageList,
      ]);
    });

    return () => {
      unsubscribe();
    };
  }, [inView]);

  const scrollToBottom = () => {
    if (!bottomElementRef.current) return;
    bottomElementRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <ul className="flex flex-col-reverse h-fit max-h-full mt-auto flex-grow overflow-y-auto pb-[69px] scrollbar-thin scrollbar-thumb-text/40">
        <span ref={bottomElementRef} />
        {messageList.map(message => (
          <MessageLI key={message.uid} message={message} />
        ))}
        <span
          ref={loadElementRef}
          className="flex py-4 justify-center items-center w-full">
          <AiOutlineLoading className="animate-spin" />
        </span>
      </ul>
      <ChatMessageInputField
        chatId={params.chat_id}
        scrollToBottom={scrollToBottom}
      />
    </>
  );
}
