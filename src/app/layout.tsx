import clsx from "clsx";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AuthContextProvider } from "@/context/authContext";

import "./globals.css";

export const metadata: Metadata = {
  title: "peer lift",
  description: "PEER_LIFT",
};

const roboto = Roboto({ weight: "500", subsets: ["latin"] });

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
        <AuthContextProvider>
          {/* <Header /> */}
          {/* <div className="flex-grow flex flex-col sm:flex-row-reverse overflow-y-auto"> */}
          <main>{children}</main>
          {/* <Navbar /> */}
          {/* </div> */}
        </AuthContextProvider>
      </body>
    </html>
  );
}
