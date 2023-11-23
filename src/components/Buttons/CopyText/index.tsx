import toast from "react-hot-toast";

export default function CopyText({
  text,
  children,
  callBack,
}: {
  text: string;
  children: React.ReactNode;
  callBack?: () => void;
}) {
  const copyMessage = () => {
    window.navigator.clipboard.writeText(text);
    if (callBack) callBack();
    toast.success("Copied text successfully.");
  };
  return (
    <button
      className="py-2 px-3 border-b border-text/10 text-left"
      onClick={copyMessage}>
      {children}
    </button>
  );
}
