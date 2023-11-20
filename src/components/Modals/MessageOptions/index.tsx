"use client";
import toast from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";
import { useAuthContext } from "@/context/authContext";
import {
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import Modal from "..";
import { db } from "@/firebase/config";
import UserInfo from "@/components/UserInfo";
import { useMessageOptionsContext } from "@/context/messageOptionContext";

export default function MessageOptionsModal() {
  const { user } = useAuthContext();
  const { isOpen, selectedMessage, closeMessageOptionModal } =
    useMessageOptionsContext();

  const reportMessage = async () => {
    if (!user || !selectedMessage) return;
    try {
      const reportedMessageRef = doc(db, "reported", "messages");

      await updateDoc(reportedMessageRef, {
        messages: arrayUnion({
          reportedBy: user.uid,
          text: selectedMessage.text,
          messageUid: selectedMessage.uid,
          messageAuthor: selectedMessage.uid,
        }),
      });

      closeMessageOptionModal();
      toast.success("Reported message successful.");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const reportUser = async () => {
    if (!user || !selectedMessage) return;
    try {
      const reportedMessageRef = doc(db, "reported", "users");

      await updateDoc(reportedMessageRef, {
        users: arrayUnion({
          reportedBy: user.uid,
          text: selectedMessage.text,
          messageUid: selectedMessage.uid,
          messageAuthor: selectedMessage.user,
        }),
      });

      closeMessageOptionModal();
      toast.success("Reported user successful.");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const copyMessage = () => {
    if (!selectedMessage) return;
    window.navigator.clipboard.writeText(selectedMessage.text);
    closeMessageOptionModal();
    toast.success("Copied text successfully.");
  };

  const sendFriendRequest = () => {
    if (!selectedMessage || !user) return;

    const selectedUserNotificationRef = collection(
      db,
      "users",
      selectedMessage.user,
      "notifications"
    );

    const notificationSentPromise = addDoc(selectedUserNotificationRef, {
      from: user.uid,
      type: "friend-request",
      createdAt: serverTimestamp(),
    });

    closeMessageOptionModal();
    toast.promise(notificationSentPromise, {
      loading: "Sending friend request.",
      success: "Friend request sent successful.",
      error: "Something went wrong.",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeMessageOptionModal}
      contentClassName="mb-0 rounded-b-none !h-fit !w-full sm:rounded-b-3xl sm:mb-auto sm:max-w-lg">
      <div className="bg-grey py-3 px-5 text-background flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <UserInfo user={selectedMessage?.user as string} />
        </div>
        <button onClick={closeMessageOptionModal}>
          <FaXmark className="h-6 font-bold" />
        </button>
      </div>
      <div className="bg-text py-5 px-6">
        <div className="w-full bg-grey text-background font-bold text-sm font-sans grid text-left">
          <button
            className="py-2 px-3 border-b border-text/10 text-left"
            onClick={copyMessage}>
            Copy Message
          </button>
          {user?.uid !== selectedMessage?.user && (
            <>
              <button
                className="py-2 px-3 border-b border-text/10 text-primary text-left"
                onClick={reportUser}>
                Report User
              </button>
              <button
                className="py-2 px-3 text-primary border-b border-text/10 text-left"
                onClick={reportMessage}>
                Report Message
              </button>
              <button
                className="py-2 px-3 text-green text-left"
                onClick={sendFriendRequest}>
                Send Friend Request
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
