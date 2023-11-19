import { AiOutlineLoading } from "react-icons/ai";

export default function LoadingSkeleton() {
  return (
    <div className="h-full w-full flex">
      <AiOutlineLoading className="animate-spin m-auto text-3xl" />
    </div>
  );
}
