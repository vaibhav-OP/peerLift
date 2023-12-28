"use client";
import { PropsWithChildren, createContext, useContext, useState } from "react";

const UpdateProfile = createContext({
  isOpen: false,
  openThreadOptionModal: () => {},
  closeThreadOptionModal: () => {},
});

export const useUpdateProfileContext = () => useContext(UpdateProfile);

export const UpdateProfileContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  const openThreadOptionModal = () => setIsOpen(true);
  const closeThreadOptionModal = () => setIsOpen(false);

  return (
    <UpdateProfile.Provider
      value={{ isOpen, openThreadOptionModal, closeThreadOptionModal }}>
      {children}
    </UpdateProfile.Provider>
  );
};
