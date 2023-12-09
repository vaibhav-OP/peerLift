import TextHeader from "@/components/Header/TextHeader";
import ThreadOptions from "@/components/Modals/ThreadOptions";
import { ThreadOptionsContextProvider } from "@/context/threadOptionContext";

export default function ThreadLayout({
  params,
  children,
}: {
  params: {
    thread_type: string;
  };
  children: React.ReactNode;
}) {
  return (
    <>
      <TextHeader heading={decodeURIComponent(params.thread_type)} />
      <ThreadOptionsContextProvider>
        <ThreadOptions />
        <div className="relative h-fullWoHeader overflow-x-auto flex flex-col">
          {children}
        </div>
      </ThreadOptionsContextProvider>
    </>
  );
}
