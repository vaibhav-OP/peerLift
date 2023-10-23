"use client";
import { useAuthContext } from "@/context/authContext";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";

export default function Home() {
  const { user } = useAuthContext();

  return (
    <div>
      {user?.uid}
      <button onClick={() => signOut(auth)}>logout</button>
    </div>
  );
}
