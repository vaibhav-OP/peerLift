import type { Metadata } from "next";
import { AuthContextProvider } from "@/context/authContext";

import "./globals.css";

export const metadata: Metadata = {
  title: "peer lift",
  description: "PEER_LIFT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-text">
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
