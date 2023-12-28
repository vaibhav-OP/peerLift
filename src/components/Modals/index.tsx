import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

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
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className={clsx(
            "fixed flex h-full w-full top-0 left-0 bg-text/40 z-50 backdrop-blur-sm cursor-pointer",
            overlayClassName
          )}
          onClick={e => {
            if (e.currentTarget != e.target) return;
            onRequestClose();
          }}>
          <motion.div
            exit={{ y: "100%" }}
            whileInView={{ y: 0 }}
            initial={{ y: "100%" }}
            className={clsx(
              "bg-background w-5/6 h-5/6 m-auto rounded-3xl overflow-hidden cursor-default",
              contentClassName
            )}>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
