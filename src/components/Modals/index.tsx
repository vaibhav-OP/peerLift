import clsx from "clsx";

export default function Modal({
  isOpen,
  children,
  contentClassName,
  overlayClassName,
  onRequestClose,
}: {
  isOpen: boolean;
  contentClassName?: string;
  overlayClassName?: string;
  children?: React.ReactNode;
  onRequestClose: () => void;
}) {
  if (!isOpen) return;
  return (
    <div
      className={clsx(
        "fixed flex h-full w-full top-0 left-0 bg-text/40 z-50 backdrop-blur-sm",
        overlayClassName
      )}
      onClick={e => {
        if (e.currentTarget != e.target) return;
        onRequestClose();
      }}>
      <div
        className={clsx(
          "bg-background w-5/6 h-5/6 m-auto rounded-3xl overflow-hidden",
          contentClassName
        )}>
        {children}
      </div>
    </div>
  );
}
