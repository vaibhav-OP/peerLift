"use client";
import { useEffect, useState } from "react";
import {
  query,
  where,
  getDocs,
  Timestamp,
  collection,
  QuerySnapshot,
  onSnapshot,
} from "firebase/firestore";

import { db } from "@/firebase/config";
import { useAuthContext } from "@/context/authContext";
import FriendRequestLi from "./FriendRequestLi";

export type IFriendRequests = {
  uid: string;
  from: string;
  createdAt: Timestamp;
  type: "friend-request";
};

export default function PendingRequests() {
  const { user } = useAuthContext();

  const [pendingRequests, setPendingRequests] = useState<IFriendRequests[]>([]);

  useEffect(() => {
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

    const unsubscribe = onSnapshot(userNotificationQuery, async snapshot => {
      if (snapshot.metadata.hasPendingWrites) return;
      const fetchPendingRequests: IFriendRequests[] = [];

      await Promise.all(
        snapshot.docs.map(doc => {
          const data = { uid: doc.id, ...doc.data() } as IFriendRequests;
          fetchPendingRequests.push(data);
        })
      );

      setPendingRequests(fetchPendingRequests);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <ul>
      {pendingRequests.map(request => (
        <FriendRequestLi key={request.uid} request={request} />
      ))}
    </ul>
  );
}
