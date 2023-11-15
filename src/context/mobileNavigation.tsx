"use client";
import { PropsWithChildren, createContext, useContext, useState } from "react";

const MobileNavigation = createContext<{
  isOpen: boolean;
  openMobileNav?: () => void;
  closeMobileNav?: () => void;
}>({
  isOpen: false,
});
export const useMobileNavigation = () => useContext(MobileNavigation);

export const MobileNavigationContextProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const [isOpen, setIsOpen] = useState(true);

  const openMobileNav = () => setIsOpen(true);
  const closeMobileNav = () => setIsOpen(false);

  return (
    <MobileNavigation.Provider
      value={{
        isOpen: isOpen,
        openMobileNav: openMobileNav,
        closeMobileNav: closeMobileNav,
      }}>
      {children}
    </MobileNavigation.Provider>
  );
};
