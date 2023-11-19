import ThreadOptions from "@/components/Modals/ThreadOptions";
import { ThreadOptionsContextProvider } from "@/context/threadOptionContext";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThreadOptionsContextProvider>
      <ThreadOptions />
      {children}
    </ThreadOptionsContextProvider>
  );
}
