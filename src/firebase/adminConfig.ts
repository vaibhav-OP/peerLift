import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";

const serviceAccount =
  require("./peerlift-firebase-adminsdk-dwkc0-294b26b3c2.json") as ServiceAccount;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const { FieldValue } = admin.firestore;
const firebaseAdmin = admin.firestore();

export { firebaseAdmin, FieldValue };

export default admin;
