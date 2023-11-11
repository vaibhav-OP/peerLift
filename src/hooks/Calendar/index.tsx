"use client";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { addMonths, getDaysInMonth, startOfMonth, subMonths } from "date-fns";

import { JournalData } from "@/types/journalData";

export default function useCalendar(jounalData?: JournalData[]) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const prevMonth = () =>
    setCurrentMonth(currentMonth => subMonths(currentMonth, 1));
  const nextMonth = () =>
    setCurrentMonth(currentMonth => addMonths(currentMonth, 1));

  const RenderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const daysInMonth = getDaysInMonth(currentMonth);
    const startDay = monthStart.getDay();

    const currentDateMonth = currentMonth.getMonth();
    const currentDateYear = currentMonth.getFullYear();

    const selectedDateDate = selectedDate.getDate();
    const selectedDateMonth = selectedDate.getMonth();
    const selectedDateYear = selectedDate.getFullYear();

    const days = [];
    const isSelectedMonth =
      currentDateMonth === selectedDateMonth &&
      currentDateYear === selectedDateYear;

    // adds blank space in starting
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`${i}_blank`}></div>);
    }

    // adds elements for current month
    for (let i = 1; i <= daysInMonth; i++) {
      const buttonDate = new Date(currentDateYear, currentDateMonth, i);
      const isMarked = !!jounalData?.find(
        journal =>
          journal.createdAt.toDate().toDateString() ===
          buttonDate.toDateString()
      );
      const isSelectedDate = isSelectedMonth && selectedDateDate === i;

      days.push(
        <button
          key={`${i}_date`}
          className={clsx(
            isSelectedDate && "bg-background text-text",
            isMarked && !isSelectedDate && "bg-background/40",
            "font-semibold text-sm h-6 w-6 flex justify-center items-center rounded-full"
          )}
          onClick={() => {
            setSelectedDate(buttonDate);
          }}>
          {i}
        </button>
      );
    }

    return <>{days}</>;
  };

  return {
    selectedDate: selectedDate,
    currentMonth: currentMonth,
    calender: (
      <div className="bg-text text-background px-3 py-10 rounded-2xl text-center flex flex-col gap-5 justify-center w-full max-w-xl mx-auto shadow-2xl">
        <div className="flex font-bold text-base justify-between">
          <span>Select Date</span>
          <div className="flex gap-1">
            <button onClick={prevMonth}>
              <AiOutlineLeft />
            </button>
            <span>
              {currentMonth.toLocaleDateString("default", {
                month: "short",
                year: "numeric",
              })}
            </span>
            <button onClick={nextMonth}>
              <AiOutlineRight />
            </button>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-7 gap-6 justify-items-center">
          <RenderDays />
          <RenderCells />
        </div>
      </div>
    ),
  };
}

const RenderDays = () => {
  const days = useMemo(() => ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], []);
  return (
    <>
      {days.map(day => (
        <div
          key={day}
          className="text-xs h-6 w-6 flex justify-center items-center">
          {day}
        </div>
      ))}
    </>
  );
};
