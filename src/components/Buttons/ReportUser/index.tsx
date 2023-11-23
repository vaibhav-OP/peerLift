import toast from "react-hot-toast";

import { db } from "@/firebase/config";
import { useAuthContext } from "@/context/authContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export default function ReportUser({
  report,
  closeModalFallback,
}: {
  report: {
    uid: string;
    title: string;
    body?: string;
    author: string;
    type: "message" | "thread";
  };
  closeModalFallback: () => void;
}) {
  const { user } = useAuthContext();

  const reportUser = async () => {
    if (!user) return;
    try {
      const reportedMessageRef = doc(db, "reported", "users");

      await updateDoc(reportedMessageRef, {
        users: arrayUnion({
          type: report.type,
          title: report.title,
          reportedBy: user.uid,
          reportedUid: report.uid,
          reportedAuthor: report.author,
        }),
      });

      closeModalFallback();
      toast.success("Reported user successful.");
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong.");
    }
  };
  return (
    <button
      className="py-2 px-3 border-b border-text/10 text-primary text-left"
      onClick={reportUser}>
      Report User
    </button>
  );
}
