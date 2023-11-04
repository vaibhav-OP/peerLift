"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {
  query,
  orderBy,
  Timestamp,
  collection,
  onSnapshot,
  DocumentReference,
  limit,
  startAfter,
} from "firebase/firestore";

import { db } from "@/firebase/config";
import formatTimeSince from "@/helper/timeSince";
import UserInfo from "../Threads/Li/UserInfo";
import { MessageInputField } from ".";
import { AiOutlineLoading } from "react-icons/ai";

type Message = {
  uid: string;
  text: string;
  createdAt: Timestamp;
  user: DocumentReference;
};

export default function MessageUI({
  params,
}: {
  params: {
    thread_id: string;
  };
}) {
  const ulRef = useRef<HTMLUListElement>(null);
  const scroll = useRef<HTMLSpanElement>(null);
  const { ref: loaderRef, inView } = useInView({
    delay: 1000,
    threshold: 1,
    initialInView: true,
  });
  const [chatEnd, setChatEnd] = useState(false);
  const [messageList, setMessageList] = useState<Message[]>([]);

  // firebase
  const messageRef = collection(db, "threads", params.thread_id, "messages");

  const scrollToBottom = () => {};

  // loads new Data
  useEffect(() => {
    const fetchNewMessages = async () => {
      const lastMessage = messageList.pop();
      if (!lastMessage || !inView) return;
      const messageQuery = query(
        messageRef,
        orderBy("createdAt", "desc"),
        startAfter(lastMessage.createdAt),
        limit(10)
      );

      onSnapshot(messageQuery, QuerySnapshot => {
        const fetchedMessages: Message[] = [];
        QuerySnapshot.forEach(doc => {
          fetchedMessages.push({ uid: doc.id, ...doc.data() } as Message);
        });

        if (fetchedMessages.length < 10) setChatEnd(true);
        setMessageList(oldMessages => [
          ...new Set([...oldMessages, ...fetchedMessages]),
        ]);
      });
    };
    fetchNewMessages();
  }, [inView]);

  // initially load Messages
  useEffect(() => {
    const messageQuery = query(
      messageRef,
      orderBy("createdAt", "desc"),
      limit(10)
    );

    const unsubscribe = onSnapshot(messageQuery, QuerySnapshot => {
      const fetchedMessages: Message[] = [];
      QuerySnapshot.forEach(doc => {
        fetchedMessages.push({ uid: doc.id, ...doc.data() } as Message);
      });

      if (fetchedMessages.length < 10) setChatEnd(true);
      setMessageList(fetchedMessages);
    });
    return () => unsubscribe();
  }, []);

  useLayoutEffect(() => {
    const currentMessageIndex = messageList.length - 2;
    ulRef.current?.children[currentMessageIndex]?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messageList]);

  return (
    <>
      <ul
        className="flex flex-col-reverse flex-grow overflow-y-auto h-full"
        ref={ulRef}>
        <span ref={scroll} />
        {messageList.map(message => (
          <li
            key={message.uid}
            className="border-b py-3 px-6 flex border-text/10">
            <div className="flex-grow">
              <div className="flex gap-3">
                <UserInfo user={message.user} />
                <span className="text-text/40">
                  {formatTimeSince(message.createdAt?.toDate() || new Date())}
                </span>
              </div>
              <div className="font-normal">{message.text}</div>
            </div>
            <div>
              <BiDotsHorizontalRounded className="text-lg font-bold" />
            </div>
          </li>
        ))}
        {!chatEnd && (
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
