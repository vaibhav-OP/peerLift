import type { Metadata } from "next";
import { AuthContextProvider } from "@/context/authContext";

import Navbar from "@/app/navbar";

import "./globals.css";
import Header from "@/components/Header";

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
      <body className="bg-background text-text h-screen flex flex-col">
        <AuthContextProvider>
          <Header />
          <div className="flex-grow flex flex-col sm:flex-row-reverse overflow-y-auto">
            <main className="overflow-y-auto p-4 w-full">{children}</main>
            <Navbar />
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
