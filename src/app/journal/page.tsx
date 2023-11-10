import Calendar from "@/components/Calendar";
import { TextHeader } from "@/components/Header";

export default function JournalPage() {
  return (
    <>
      <TextHeader heading="Past Journals" />
      <section className="px-5 sm:px-8 border-t border-text/10 py-3">
        <Calendar />
      </section>
    </>
  );
}
