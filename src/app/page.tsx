"use client";
import { useAuthContext } from "@/context/authContext";
import ThreadsYouMightLike from "@/components/ThreadsYouMightLike";

export default function Home() {
  const { userData } = useAuthContext();

  return (
    <>
      <h5 className="font-extrabold text-2xl">👋 Hi {userData?.displayName}</h5>
      <ThreadsYouMightLike />
    </>
  );
}
