"use client";
import { Message } from "@/components/Message/messageUI";
import { PropsWithChildren, createContext, useContext, useState } from "react";

const MessageOptions = createContext<{
  isOpen: boolean;
  selectedUserUid: string;
  selectedMessage: Message | undefined;
  closeMessageOptionModal: () => void;
  openMessageOptionModal: (userUid: string, message: Message) => void;
}>({
  isOpen: false,
  selectedUserUid: "",
  selectedMessage: undefined,
  closeMessageOptionModal: () => {},
  openMessageOptionModal: (userUid: string, message: Message) => {},
});
export const useMessageOptionsContext = () => useContext(MessageOptions);

export const MessageOptionsContextProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUserUid, setSelectedUserUid] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message>();

  const openMessageOptionModal = (userUid: string, message: Message) => {
    setSelectedUserUid(userUid);
    setSelectedMessage(message);
    setIsOpen(true);
  };
  const closeMessageOptionModal = () => {
    setSelectedUserUid("");
    setSelectedMessage(undefined);
    setIsOpen(false);
  };

  return (
    <MessageOptions.Provider
      value={{
        isOpen: isOpen,
        selectedUserUid: selectedUserUid,
        selectedMessage: selectedMessage,
        openMessageOptionModal: openMessageOptionModal,
        closeMessageOptionModal: closeMessageOptionModal,
      }}>
      {children}
    </MessageOptions.Provider>
  );
};
