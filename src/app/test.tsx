"use client";
import { useAuthContext } from "@/context/authContext";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";

export default function Test() {
  const { user } = useAuthContext();
  return (
    <>
      <h5 className="font-extrabold text-2xl">👋 Hi {user?.displayName}</h5>
      <button onClick={() => signOut(auth)}>logout</button>
    </>
  );
}
