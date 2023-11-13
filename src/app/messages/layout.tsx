import { TextHeader } from "@/components/Header";
import InboxList from "./InboxList";

export default function MessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TextHeader heading="Messages" />
      <div className="flex sm:stac">
        <InboxList />
        <div className="flex-grow">{children}</div>
      </div>
    </>
  );
}
