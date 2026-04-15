"use client";

import { useMonthlyCalendar } from "../model/useMonthlyCalendar";
import { MonthlyCalendar } from "./MonthlyCalendar.ui";

export const MonthlyCalendarContainer = () => {
  const {
    monthLabel,
    calendarDays,
    firstDayOfWeek,
    showLog,
    showGit,
    setShowLog,
    setShowGit,
    getDayStatus,
    getDayIcon,
    getDayColorClass,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
  } = useMonthlyCalendar();

  const handleToggleLog = () => {
    setShowLog((prev) => !prev);
  };

  const handleToggleGit = () => {
    setShowGit((prev) => !prev);
  };

  return (
    <MonthlyCalendar
      monthLabel={monthLabel}
      calendarDays={calendarDays}
      firstDayOfWeek={firstDayOfWeek}
      showLog={showLog}
      showGit={showGit}
      onToggleLog={handleToggleLog}
      onToggleGit={handleToggleGit}
      getDayStatus={getDayStatus}
      getDayIcon={getDayIcon}
      getDayColorClass={getDayColorClass}
      goToPreviousMonth={goToPreviousMonth}
      goToNextMonth={goToNextMonth}
      goToToday={goToToday}
    />
  );
};
