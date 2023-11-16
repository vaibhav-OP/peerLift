import MessageOptionsModal from "@/components/Modals/MessageOptions";
import { MessageOptionsContextProvider } from "@/context/messageOptionContext";

export default function MessageChatLayout({
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
