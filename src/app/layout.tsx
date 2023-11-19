import clsx from "clsx";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import ReactToastify from "@/components/ReactToastify";

import "@/style/globals.css";
import { AuthContextProvider } from "@/context/authContext";

export const metadata: Metadata = {
  title: "peer lift",
  description: "PEER_LIFT",
};

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          "bg-background text-text h-screen flex flex-col",
          roboto.className
        )}>
        <ReactToastify />
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
