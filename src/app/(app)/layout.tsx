import Navbar from "@/components/Navbar";
import { AuthContextProvider } from "@/context/authContext";
import ThreadOptions from "@/components/Modals/ThreadOptions";
import { ThreadOptionsContextProvider } from "@/context/threadOptionContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <main
        className="overflow-y-auto transition-all overflow-hidden flex flex-col"
        id="app">
        <ThreadOptionsContextProvider>
          <ThreadOptions />
          {children}
        </ThreadOptionsContextProvider>
      </main>
      <Navbar />
    </AuthContextProvider>
  );
}
