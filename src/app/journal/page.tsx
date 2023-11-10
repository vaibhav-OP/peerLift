"use client";
import useCalendar from "@/hooks/Calendar";
import { TextHeader } from "@/components/Header";

export default function JournalPage() {
  const { calender } = useCalendar([new Date(2023, 10, 2)]);

  return (
    <>
      <TextHeader heading="Past Journals" />
      <section className="px-5 sm:px-8 border-t border-text/10 py-3">
        {calender}
      </section>
    </>
  );
}
