"use client";
import { useAuthContext } from "@/context/authContext";

export default function Home() {
  const { user } = useAuthContext();

  return <div>{user?.uid}</div>;
}
