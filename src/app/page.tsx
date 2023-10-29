"use client";
import { useAuthContext } from "@/context/authContext";
import ThreadsYouMightLike from "@/components/ThreadsYouMightLike";

export default function Home() {
  const { user } = useAuthContext();

  return (
    <>
      <h5 className="font-extrabold text-2xl">👋 Hi {user?.displayName}</h5>
      <ThreadsYouMightLike />
    </>
  );
}
