import { useMemo } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { arrayUnion, deleteDoc, doc, updateDoc } from "firebase/firestore";

import { db } from "@/firebase/config";
import UserInfo from "@/components/UserInfo";
import formatTimeSince from "@/helper/timeSince";
import { useAuthContext } from "@/context/authContext";
import { useMessageOptionsContext } from "@/context/messageOptionContext";

import { IFriendRequests } from "./PendingRequests";
import acceptFriendRequest from "./acceptFriendRequest";

export default function FriendRequestLi({
  request,
}: {
  request: IFriendRequests;
}) {
  const { user } = useAuthContext();
  const { closeMessageOptionModal } = useMessageOptionsContext();

  const userRef = useMemo(() => doc(db, "users", user?.uid as string), [user]);
  const notificationRef = useMemo(
    () => doc(userRef, "notifications", request.uid),
    [request, userRef]
  );

  const handleIgnoreFriendRequest = () => {
    const notificationPromise = deleteDoc(notificationRef);

    toast.promise(notificationPromise, {
      success: () => {
        closeMessageOptionModal();
        return "Friend request ignored.";
      },
      loading: "Ignoring friend request",
      error: "Something went wrong.",
    });
  };

  const handleAcceptFriendRequest = async () => {
    if (!user) return;
    closeMessageOptionModal();
    const result = await acceptFriendRequest(user.uid, request.from);

    if (result?.error) return toast.error(result.error);
    deleteDoc(notificationRef);
    toast.success("Friend request accepted succesfully.");
  };
  return (
    <li className="flex justify-between items-center py-3 border-b border-text/10 px-4">
      <div>
        <div className="flex gap-2 items-center font-semibold text-sm">
          <UserInfo user={request.from} />
          <span className="ml-2 text-xs text-text/40 font-normal">
            {formatTimeSince(request.createdAt.toDate())}
          </span>
        </div>
        <span className="text-sm text-text/40 font-normal">
          Incoming Friend Request
        </span>
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleAcceptFriendRequest}
          className="h-10 w-10 flex justify-center items-center rounded-full bg-text/10 hover:text-green hover:bg-grey text-center transition-all relative
              hover:after:content-['Accept'] hover:after:absolute hover:after:bottom-full hover:after:right-full hover:after:bg-grey hover:after:text-background
               hover:after:px-3 hover:after:py-1 hover:after:shadow-xl hover:after:rounded-lg hover:after:rounded-br-none hover:after:mb-1">
          <FaCheck />
        </button>
        <button
          onClick={handleIgnoreFriendRequest}
          className="h-10 w-10 flex justify-center items-center rounded-full bg-text/10 hover:text-primary hover:bg-grey text-center transition-all relative
              hover:after:content-['Ignore'] hover:after:absolute hover:after:bottom-full hover:after:right-full hover:after:bg-grey hover:after:text-background
               hover:after:px-3 hover:after:py-1 hover:after:shadow-xl hover:after:rounded-lg hover:after:rounded-br-none hover:after:mb-1"
          title="Ignore">
          <FaXmark />
        </button>
      </div>
    </li>
  );
}
