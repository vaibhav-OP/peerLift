import renderWithNewlines from "@/helper/renderWithNewLines";
import { JournalData } from "@/types/journalData";

export default function JournalSection({
  journalData,
}: {
  journalData?: JournalData;
}) {
  if (!journalData) return <div></div>;

  return (
    <div className="mt-9 rounded-2xl bg-secondary py-6 px-9">
      <span>{journalData.createdAt.toDate().toLocaleDateString()}</span>
      <div className="mt-3 mb-1 font-bold">{journalData.title}</div>
      <div dangerouslySetInnerHTML={renderWithNewlines(journalData.body)} />
    </div>
  );
}
