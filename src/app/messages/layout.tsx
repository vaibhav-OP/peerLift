import { TextHeader } from "@/components/Header";
import { InboxList } from "@/components/Chatroom";

export default function MessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TextHeader heading="Messages" />
      <div className="flex h-full relative overflow-hidden">
        <InboxList />
        <div className="flex-grow relative flex">{children}</div>
      </div>
    </>
  );
}
