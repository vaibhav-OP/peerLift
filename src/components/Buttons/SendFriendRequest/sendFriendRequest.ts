"use server";

import { FieldValue } from "firebase-admin/firestore";
import { firebaseAdmin } from "@/firebase/adminConfig";

export default async function sendFriendRequest(
  senderUid: string,
  receiverUid: string
) {
  const selectedUserNotificationRef = firebaseAdmin.collection(
    `users/${receiverUid}/notifications`
  );

  try {
    const snapshot = await selectedUserNotificationRef
      .where("from", "==", senderUid)
      .where("type", "==", "friend-request")
      .get();

    if (!snapshot.empty) throw new Error("Friend request already sent.");

    selectedUserNotificationRef.doc().set({
      from: senderUid,
      type: "friend-request",
      createdAt: FieldValue.serverTimestamp(),
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        error: err ? err.message : "Something went wrong.",
      };
    }
  }
}
