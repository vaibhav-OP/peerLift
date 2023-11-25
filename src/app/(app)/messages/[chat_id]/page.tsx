"use client";
import { AiOutlineLoading } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  arrayUnion,
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/firebase/config";
import { MessageLI } from "@/components/Message";
import { Message } from "@/components/Message/messageUI";
import { useMobileNavigation } from "@/context/mobileNavigation";

import ChatMessageInputField from "./MessageInput";
import { useAuthContext } from "@/context/authContext";

export default function ChatPage({
  params,
}: {
  params: {
    chat_id: string;
  };
}) {
  const { user } = useAuthContext();
  const { closeMobileNav } = useMobileNavigation();

  const [messageList, setMessageList] = useState<Message[]>([]);
  const [allMessagesFetched, setAllMessagesFetched] = useState(false);

  const bottomElementRef = useRef<HTMLSpanElement>(null);
  const { ref: loadElementRef, inView } = useInView({
    threshold: 1,
    initialInView: true,
  });

  useEffect(() => {
    const chatroomRef = doc(db, "chatrooms", params.chat_id);
    const messagesRef = collection(chatroomRef, "messages");
    const messagesQuery = query(
      messagesRef,
      orderBy("createdAt", "desc"),
      limit(15)
    );

    const unsubscribe = onSnapshot(messagesQuery, async querySnapshot => {
      if (querySnapshot.metadata.hasPendingWrites) return;
      const updatedMessageList: Message[] = [];

      await Promise.all(
        querySnapshot.docs.map(doc => {
          const messageData = { uid: doc.id, ...doc.data() } as Message;
          updatedMessageList.push(messageData);
        })
      );

      setMessageList(updatedMessageList);
      if (querySnapshot.empty || querySnapshot.size < 15)
        setAllMessagesFetched(true);

      updateDoc(chatroomRef, {
        "lastMessage.readBy": arrayUnion(user?.uid as string),
      });
      scrollToBottom();
    });

    if (closeMobileNav) closeMobileNav();

    return () => {
      unsubscribe();
    };
  }, [params.chat_id]);

  useEffect(() => {
    if (!inView || allMessagesFetched) return;
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
      if (querySnapshot.metadata.hasPendingWrites) return;
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
      if (querySnapshot.empty && startAfterMsg) setAllMessagesFetched(true);
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
      <ul className="flex flex-col-reverse h-fit max-h-full mt-auto flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-text/40">
        <span ref={bottomElementRef} />
        {messageList.map(message => (
          <MessageLI key={message.uid} message={message} />
        ))}

        {!allMessagesFetched && (
          <span
            ref={loadElementRef}
            className="flex py-4 justify-center items-center w-full">
            <AiOutlineLoading className="animate-spin" />
          </span>
        )}
      </ul>
      <ChatMessageInputField
        chatId={params.chat_id}
        scrollToBottom={scrollToBottom}
      />
    </>
  );
}
