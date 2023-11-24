"use server";

import { FieldValue, firebaseAdmin } from "@/firebase/adminConfig";

export default async function acceptFriendRequest(
  senderUid: string,
  receiverUid: string
) {
  try {
    const senderRef = firebaseAdmin.doc(`users/${senderUid}`);
    const receiverRef = firebaseAdmin.doc(`users/${receiverUid}`);

    const senderSnap = await senderRef.get();
    const receiverSnap = await receiverRef.get();

    if (!senderSnap.exists || !receiverSnap.exists) {
      throw new Error("Sender or receiver does not exist.");
    }

    await senderRef.update({
      friendList: FieldValue.arrayUnion(receiverUid),
    });

    await receiverRef.update({
      friendList: FieldValue.arrayUnion(senderUid),
    });

    return { success: true };
  } catch (err) {
    if (err instanceof Error)
      return { error: err ? err.message : "Something went wrong." };
  }
}
