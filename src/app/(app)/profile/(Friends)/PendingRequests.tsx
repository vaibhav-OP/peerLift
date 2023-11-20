"use client";

import { useEffect, useState } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import {
  query,
  where,
  getDocs,
  collection,
  Timestamp,
} from "firebase/firestore";

import { db } from "@/firebase/config";
import UserInfo from "@/components/UserInfo";
import formatTimeSince from "@/helper/timeSince";
import { useAuthContext } from "@/context/authContext";

type IFriendRequests = {
  uid: string;
  from: string;
  createdAt: Timestamp;
  type: "friend-request";
};

export default function PendingRequests() {
  const { user } = useAuthContext();

  const [pendingRequests, setPendingRequests] = useState<IFriendRequests[]>([]);

  useEffect(() => {
    async function fetchPendingRequests() {
      if (!user) return;
      const userNotificationRef = collection(
        db,
        "users",
        user?.uid,
        "notifications"
      );
      const userNotificationQuery = query(
        userNotificationRef,
        where("type", "==", "friend-request")
      );
      const userNotificationSnapshot = await getDocs(userNotificationQuery);

      const fetchPendingRequests: IFriendRequests[] = [];

      await Promise.all(
        userNotificationSnapshot.docs.map(doc => {
          const data = { uid: doc.id, ...doc.data() } as IFriendRequests;
          fetchPendingRequests.push(data);
        })
      );

      setPendingRequests(fetchPendingRequests);
    }
    fetchPendingRequests();
  }, []);
  return (
    <ul>
      {pendingRequests.map(requests => (
        <li
          key={requests.uid}
          className="flex justify-between items-center py-3 border-b border-text/10 px-4">
          <div>
            <div className="flex gap-2 items-center font-semibold text-sm">
              <UserInfo user={requests.from} />
              <span className="ml-2 text-xs text-text/40 font-normal">
                {formatTimeSince(requests.createdAt.toDate())}
              </span>
            </div>
            <span className="text-sm text-text/40 font-normal">
              Incoming Friend Request
            </span>
          </div>
          <div className="flex gap-4">
            <button
              className="h-10 w-10 flex justify-center items-center rounded-full bg-text/10 hover:text-green hover:bg-grey text-center transition-all relative
              hover:after:content-['Accept'] hover:after:absolute hover:after:bottom-full hover:after:right-full hover:after:bg-grey hover:after:text-background
               hover:after:px-3 hover:after:py-1 hover:after:shadow-xl hover:after:rounded-lg hover:after:rounded-br-none hover:after:mb-1">
              <FaCheck />
            </button>
            <button
              className="h-10 w-10 flex justify-center items-center rounded-full bg-text/10 hover:text-primary hover:bg-grey text-center transition-all relative
              hover:after:content-['Ignore'] hover:after:absolute hover:after:bottom-full hover:after:right-full hover:after:bg-grey hover:after:text-background
               hover:after:px-3 hover:after:py-1 hover:after:shadow-xl hover:after:rounded-lg hover:after:rounded-br-none hover:after:mb-1"
              title="Ignore">
              <FaXmark />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
