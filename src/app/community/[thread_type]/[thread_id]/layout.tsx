import MessageOptionsModal from "@/components/Modals/MessageOptions";
import { MessageOptionsContextProvider } from "@/context/messageOptionContext";

export default function ThreadChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MessageOptionsContextProvider>
      <MessageOptionsModal />
      {children}
    </MessageOptionsContextProvider>
  );
}
