import Navbar from "@/components/Navbar";
import { AuthContextProvider } from "@/context/authContext";
import ThreadOptions from "@/components/Modals/ThreadOptions";
import { ThreadOptionsContextProvider } from "@/context/threadOptionContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <main className="pb-20 h-[calc(100%_-_80px)]" id="app">
        <ThreadOptionsContextProvider>
          <ThreadOptions />
          {children}
        </ThreadOptionsContextProvider>
      </main>
      <Navbar />
    </AuthContextProvider>
  );
}
