import { useAuthContext } from "@/context/authContext";
import sendFriendRequest from "./sendFriendRequest";
import toast from "react-hot-toast";

export default function SendFriendRequest({
  selectedUser,
  closeModalFallback,
}: {
  selectedUser: string;
  closeModalFallback: () => void;
}) {
  const { user } = useAuthContext();

  const handleSendFriendRequest = async () => {
    if (!user) return;
    closeModalFallback();
    const result = await sendFriendRequest(user?.uid, selectedUser);

    if (result?.error) {
      return toast.error(result.error);
    } else {
      toast.success("Friend request sent succesfull.");
    }
  };

  if (!user || selectedUser === user.uid) return;
  return (
    <>
      {!user?.friendList?.includes(selectedUser) ? (
        <button
          className="py-2 px-3 text-green text-left"
          onClick={handleSendFriendRequest}>
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
