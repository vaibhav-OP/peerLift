import toast from "react-hot-toast";
import {
  where,
  query,
  addDoc,
  getDocs,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/config";
import { useAuthContext } from "@/context/authContext";

export default function SendFriendRequest({
  selectedUser,
  closeModalFallback,
}: {
  selectedUser: string;
  closeModalFallback: () => void;
}) {
  const { user } = useAuthContext();

  const sendFriendRequest = async () => {
    if (!user) return;

    const selectedUserNotificationRef = collection(
      db,
      "users",
      selectedUser,
      "notifications"
    );

    const querySnapshot = await getDocs(
      query(
        selectedUserNotificationRef,
        where("from", "==", user.uid),
        where("type", "==", "friend-request")
      )
    );

    if (!querySnapshot.empty) {
      closeModalFallback();
      toast.error("Friend request already sent.");
      return;
    }

    const notificationSentPromise = addDoc(selectedUserNotificationRef, {
      from: user.uid,
      type: "friend-request",
      createdAt: serverTimestamp(),
    });

    closeModalFallback();
    toast.promise(notificationSentPromise, {
      loading: "Sending friend request.",
      success: "Friend request sent successful.",
      error: "Something went wrong.",
    });
  };

  if (!user || selectedUser === user.uid) return;
  return (
    <>
      {!user?.friendList?.includes(selectedUser) ? (
        <button
          className="py-2 px-3 text-green text-left"
          onClick={sendFriendRequest}>
          Send Friend Request
        </button>
      ) : (
        <button className="py-2 px-3 text-primary text-left">
          Remove Friend
        </button>
      )}
    </>
  );
}
