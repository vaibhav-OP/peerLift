"use client";
import { Thread } from "@/types/threads";
import { PropsWithChildren, createContext, useContext, useState } from "react";

const ThreadOptions = createContext<{
  isOpen: boolean;
  selectedThread: Thread | undefined;
  closeThreadOptionModal: () => void;
  openThreadOptionModal: (thread: Thread) => void;
}>({
  isOpen: false,
  selectedThread: undefined,
  openThreadOptionModal: () => {},
  closeThreadOptionModal: () => {},
});
export const useThreadOptionsContext = () => useContext(ThreadOptions);

export const ThreadOptionsContextProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState<Thread>();

  const openThreadOptionModal = (thread: Thread) => {
    setIsOpen(true);
    setSelectedThread(thread);
  };

  const closeThreadOptionModal = () => {
    setIsOpen(false);
    setSelectedThread(undefined);
  };

  return (
    <ThreadOptions.Provider
      value={{
        isOpen: isOpen,
        selectedThread: selectedThread,
        openThreadOptionModal: openThreadOptionModal,
        closeThreadOptionModal: closeThreadOptionModal,
      }}>
      {children}
    </ThreadOptions.Provider>
  );
};
