import Navbar from "@/components/Navbar";
import { AuthContextProvider } from "@/context/authContext";
import ThreadOptions from "@/components/Modals/ThreadOptions";
import { ThreadOptionsContextProvider } from "@/context/threadOptionContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <main
        className="overflow-y-auto overflow-hidden flex flex-col scrollbar-thin scrollbar-thumb-text/40"
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
