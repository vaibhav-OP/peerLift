"use client";
import { useEffect } from "react";

import { useMobileNavigation } from "@/context/mobileNavigation";

export default function MessagePage() {
  const { openMobileNav } = useMobileNavigation();
  useEffect(() => {
    if (openMobileNav) openMobileNav();
  }, []);
  return <>messages</>;
}
