"use client";
import { useEffect, useState } from "react";
import { endOfMonth, startOfMonth } from "date-fns";
import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "@/firebase/config";
import useCalendar from "@/hooks/Calendar";
import { JournalData } from "@/types/journalData";
import { useAuthContext } from "@/context/authContext";

import JournalSection from "./JournalSection";

export default function CalendarSection() {
  const { user } = useAuthContext();
  const [journalData, setJournalData] = useState<JournalData[]>();
  const [selectedJournalData, setSelectedJournalData] = useState<JournalData>();

  const { calender, currentMonth, selectedDate } = useCalendar(journalData);

  useEffect(() => {
    async function fetchJournalData() {
      if (!user) return;
      const journalQuery = query(
        collection(db, "users", user?.uid, "journals"),
        where("createdAt", ">=", startOfMonth(currentMonth)),
        where("createdAt", "<=", endOfMonth(currentMonth))
      );
      const journalSnapshot = await getDocs(journalQuery);
      const journalData: JournalData[] = [];

      journalSnapshot.forEach(doc => {
        journalData.push(doc.data() as JournalData);
      });
      setJournalData(journalData);
    }
    fetchJournalData();
  }, [currentMonth]);

  useEffect(() => {
    if (!journalData || journalData.length <= 0)
      return setSelectedJournalData(undefined);
    const selectedJournalData = journalData.find(journal => {
      const journalTimestamp = journal.createdAt.toDate();

      const journalDate = journalTimestamp.getDate(),
        journalMonth = journalTimestamp.getMonth(),
        journalYear = journalTimestamp.getFullYear();

      const selectedJournalDate = selectedDate.getDate(),
        selectedJournalMonth = selectedDate.getMonth(),
        selectedJournalYear = selectedDate.getFullYear();

      return (
        journalYear === selectedJournalYear &&
        journalMonth === selectedJournalMonth &&
        journalDate === selectedJournalDate
      );
    });
    setSelectedJournalData(selectedJournalData);
  }, [selectedDate, journalData]);

  return (
    <section className="px-5 sm:px-8 border-t border-text/10 py-3">
      {calender}
      <JournalSection journalData={selectedJournalData} />
    </section>
  );
}
