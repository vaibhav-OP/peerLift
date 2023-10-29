import CreateThreadModal from "@/components/CreateThreadModal";
import ThreadsList from "./threadsList";

export default async function DiscoverThreadsPage({
  params,
}: {
  params: {
    thread_type: string;
  };
}) {
  return (
    <>
      <CreateThreadModal threadtype={decodeURI(params.thread_type)} />
      <ThreadsList threadType={params.thread_type} />
    </>
  );
}
