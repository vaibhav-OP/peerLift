"use client";
import { useRouter } from "next/navigation";

import { InAppLinks } from "@/types/links";
import { getChatroom } from "@/helper/getChatroom";
import { useAuthContext } from "@/context/authContext";

export default function SendMessage({
  selectedUser,
}: {
  selectedUser: string;
}) {
  const route = useRouter();
  const { user } = useAuthContext();

  if (!user || user.uid === selectedUser) return;

  const handleSendMessage = async () => {
    const chatroomId = await getChatroom(user.uid, selectedUser);
    route.push(`${InAppLinks.messages}/${chatroomId}`);
  };

  return (
    <button className="py-2 px-3 text-left" onClick={handleSendMessage}>
      Send Message
    </button>
  );
}
