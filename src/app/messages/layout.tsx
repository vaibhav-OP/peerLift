import { TextHeader } from "@/components/Header";
import { InboxList } from "@/components/Chatroom";

import { MobileNavigationContextProvider } from "@/context/mobileNavigation";

export default function MessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TextHeader heading="Messages" />
      <div className="flex h-full relative overflow-hidden">
        <MobileNavigationContextProvider>
          <InboxList />

          <div className="flex-grow relative flex">{children}</div>
        </MobileNavigationContextProvider>
      </div>
    </>
  );
}
