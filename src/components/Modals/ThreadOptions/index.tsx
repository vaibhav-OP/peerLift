"use client";
import toast from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";
import UserInfo from "@/components/UserInfo";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import Modal from "..";
import { db } from "@/firebase/config";
import { useAuthContext } from "@/context/authContext";
import { useThreadOptionsContext } from "@/context/threadOptionContext";

export default function ThreadOptions() {
  const { user } = useAuthContext();
  const { isOpen, selectedThread, closeThreadOptionModal } =
    useThreadOptionsContext();

  const reportThread = async () => {
    if (!user || !selectedThread) return;
    try {
      const reportedMessageRef = doc(db, "reported", "threads");

      await updateDoc(reportedMessageRef, {
        threads: arrayUnion({
          reportedBy: user.uid,
          title: selectedThread.title,
          body: selectedThread.body,
          messageUid: selectedThread.uid,
          messageAuthor: selectedThread.user,
        }),
      });

      closeThreadOptionModal();
      toast.success("Reported thread successful.");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const reportUser = async () => {
    if (!user || !selectedThread) return;
    try {
      const reportedMessageRef = doc(db, "reported", "users");

      await updateDoc(reportedMessageRef, {
        users: arrayUnion({
          reportedBy: user.uid,
          title: selectedThread.title,
          body: selectedThread.body,
          messageAuthor: selectedThread.user,
        }),
      });

      closeThreadOptionModal();
      toast.success("Reported user successful.");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeThreadOptionModal}
      contentClassName="mb-0 rounded-b-none !h-fit sm:rounded-b-3xl sm:mb-auto sm:max-w-lg">
      <div className="bg-grey py-3 px-5 text-background flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <UserInfo user={selectedThread?.user as string} />
        </div>
        <button onClick={closeThreadOptionModal}>
          <FaXmark className="h-6 font-bold" />
        </button>
      </div>
      <div className="bg-text py-5 px-6">
        <div className="w-full bg-grey text-background font-bold text-sm font-sans grid text-left">
          <button
            className="py-2 px-3 text-primary border-b border-text/10 text-left"
            onClick={reportThread}>
            Report Message
          </button>
          <button
            className="py-2 px-3 border-b border-text/10 text-primary text-left"
            onClick={reportUser}>
            Report User
          </button>
          <button className="py-2 px-3 text-green text-left">
            Friend Request Sent
          </button>
        </div>
      </div>
    </Modal>
  );
}
