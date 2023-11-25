import { useAuthContext } from "@/context/authContext";
import sendFriendRequest from "./sendFriendRequest";
import toast from "react-hot-toast";
import removeFriend from "./removeFriend";

export default function SendFriendRequest({
  selectedUser,
  closeModalFallback,
}: {
  selectedUser: string;
  closeModalFallback: () => void;
}) {
  const { user } = useAuthContext();

  if (!user || selectedUser === user.uid) return;

  const handleSendFriendRequest = async () => {
    closeModalFallback();
    const result = await sendFriendRequest(user?.uid, selectedUser);

    if (result?.error) {
      return toast.error(result.error);
    } else {
      toast.success("Friend request sent succesfull.");
    }
  };

  const handleRemoveFriend = async () => {
    closeModalFallback();
    const result = await removeFriend(user?.uid, selectedUser);

    if (result?.error) {
      return toast.error(result.error);
    } else {
      toast.success("Removed friend succesfully.");
    }
  };

  return (
    <>
      {!user?.friendList?.includes(selectedUser) ? (
        <button
          className="py-2 px-3 text-green text-left"
          onClick={handleSendFriendRequest}>
          Send Friend Request
        </button>
      ) : (
        <button
          className="py-2 px-3 text-primary text-left"
          onClick={handleRemoveFriend}>
          Remove Friend
        </button>
      )}
    </>
  );
}
