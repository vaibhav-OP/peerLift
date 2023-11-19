import TextHeader from "@/components/Header/TextHeader";
import ThreadOptions from "@/components/Modals/ThreadOptions";
import { ThreadOptionsContextProvider } from "@/context/threadOptionContext";

export default function ThreadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TextHeader heading="test" />
      <ThreadOptionsContextProvider>
        <ThreadOptions />
        <div className="relative h-full overflow-x-auto flex flex-col">
         {children}
        </div>
      </ThreadOptionsContextProvider>
    </>
  );
}
