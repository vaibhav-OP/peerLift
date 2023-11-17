"use client";
import { Message } from "@/components/Message/messageUI";
import { PropsWithChildren, createContext, useContext, useState } from "react";

const MessageOptions = createContext<{
  isOpen: boolean;
  selectedMessage: Message | undefined;
  closeMessageOptionModal: () => void;
  openMessageOptionModal: (message: Message) => void;
}>({
  isOpen: false,
  selectedMessage: undefined,
  closeMessageOptionModal: () => {},
  openMessageOptionModal: (message: Message) => {},
});
export const useMessageOptionsContext = () => useContext(MessageOptions);

export const MessageOptionsContextProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message>();

  const openMessageOptionModal = (message: Message) => {
    setSelectedMessage(message);
    setIsOpen(true);
  };
  const closeMessageOptionModal = () => {
    setSelectedMessage(undefined);
    setIsOpen(false);
  };

  return (
    <MessageOptions.Provider
      value={{
        isOpen: isOpen,
        selectedMessage: selectedMessage,
        openMessageOptionModal: openMessageOptionModal,
        closeMessageOptionModal: closeMessageOptionModal,
      }}>
      {children}
    </MessageOptions.Provider>
  );
};
