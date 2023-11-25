"use server";

import { FieldValue, firebaseAdmin } from "@/firebase/adminConfig";

export default async function removeFriend(
  senderUid: string,
  receiverUid: string
) {
  try {
    const senderRef = firebaseAdmin.doc(`users/${senderUid}`);
    const receiverRef = firebaseAdmin.doc(`users/${receiverUid}`);

    await senderRef.update({
      friendList: FieldValue.arrayRemove(receiverUid),
    });
    await receiverRef.update({
      friendList: FieldValue.arrayRemove(senderUid),
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        error: err ? err.message : "Something went wrong.",
      };
    }
  }
}
