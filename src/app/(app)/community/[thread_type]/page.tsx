import CreateThreadModal from "@/components/Modals/CreateThread";

import ThreadsList from "./threadsList";

export default async function CommunityThreadsPage({
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
