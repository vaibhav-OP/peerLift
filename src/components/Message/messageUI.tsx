"use client";
import { AiOutlineLoading } from "react-icons/ai";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
import {
  limit,
  query,
  orderBy,
  Timestamp,
  collection,
  onSnapshot,
  startAfter,
} from "firebase/firestore";

import { db } from "@/firebase/config";

import MessageLI from "./MessageLI";
import { MessageInputField } from "./";

export type Message = {
  uid: string;
  text: string;
  createdAt: Timestamp;
  user: string;
};

export default function MessageUI({
  params,
}: {
  params: {
    thread_id: string;
  };
}) {
  const ulRef = useRef<HTMLUListElement>(null);
  const bottomElementRef = useRef<HTMLSpanElement>(null);
  const { ref: loaderRef, inView } = useInView({
    threshold: 1,
    initialInView: true,
  });

  const [messageList, setMessageList] = useState<Message[]>([]);
  const [allMessagesFetched, setAllMessagesFetched] = useState(false);

  useEffect(() => {
    if (allMessagesFetched || !inView) return;

    const messageRef = collection(db, "threads", params.thread_id, "messages");
    const startAfterMsg =
      messageList.length > 0
        ? messageList[messageList.length - 1].createdAt
        : null;

    const messageQuery = query(
      messageRef,
      orderBy("createdAt", "desc"),
      startAfter(startAfterMsg),
      limit(15)
    );

    const unsubscribe = onSnapshot(messageQuery, async QuerySnapshot => {
      if (QuerySnapshot.metadata.hasPendingWrites) return;
      const updatedMessageList: Message[] = [];

      await Promise.all(
        QuerySnapshot.docs.map(doc => {
          const messageData = { uid: doc.id, ...doc.data() } as Message;
          updatedMessageList.push(messageData);
        })
      );

      setMessageList(prevMessageList => [
        ...prevMessageList,
        ...updatedMessageList,
      ]);
      if (QuerySnapshot.empty && startAfterMsg) setAllMessagesFetched(true);
    });

    return () => {
      unsubscribe();
    };
  }, [inView]);

  // initially load Messages
  useEffect(() => {
    const messageRef = collection(db, "threads", params.thread_id, "messages");
    const messageQuery = query(
      messageRef,
      orderBy("createdAt", "desc"),
      limit(15)
    );

    const unsubscribe = onSnapshot(messageQuery, QuerySnapshot => {
      if (QuerySnapshot.metadata.hasPendingWrites) return;

      const fetchedMessages: Message[] = [];

      QuerySnapshot.forEach(doc => {
        fetchedMessages.push({ uid: doc.id, ...doc.data() } as Message);
      });

      setMessageList(fetchedMessages);
      scrollToBottom();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const scrollToBottom = () => {
    if (!bottomElementRef.current) return;
    bottomElementRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <ul
        className="flex flex-col-reverse h-fit max-h-full mt-auto flex-grow overflow-y-auto pb-[69px] scrollbar-thin scrollbar-thumb-text/40"
        ref={ulRef}>
        <span ref={bottomElementRef} />
        {messageList.map(message => (
          <MessageLI message={message} key={message.uid} />
        ))}
        {!allMessagesFetched && (
          <span
            ref={loaderRef}
            className="flex py-4 justify-center items-center w-full">
            <AiOutlineLoading className="animate-spin" />
          </span>
        )}
      </ul>
      <MessageInputField params={params} scrollToBottom={scrollToBottom} />
    </>
  );
}
