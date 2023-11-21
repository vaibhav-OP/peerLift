import UserInfo from "@/components/UserInfo";
import { useAuthContext } from "@/context/authContext";

export default function FriendList() {
  const { user } = useAuthContext();

  if (!user || !user.friendList) return <div>You have no friend :/</div>;
  return (
    <ul>
      {user.friendList.map(friend => (
        <li
          key={friend}
          className="flex justify-between items-center py-3 border-b border-text/10 px-4">
          <div className="flex gap-2 items-center font-semibold text-sm">
            <UserInfo user={friend} />
          </div>
        </li>
      ))}
    </ul>
  );
}
