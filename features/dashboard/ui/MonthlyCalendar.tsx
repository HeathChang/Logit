"use client";

import { DUAL_STATUS } from "@/shared/type/common.type";
import type { DayStatus } from "../model/useMonthlyCalendar";
import { useMonthlyCalendar } from "../model/useMonthlyCalendar";
import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";

export interface MonthlyCalendarProps {
  monthLabel: string;
  calendarDays: Date[];
  firstDayOfWeek: number;
  showLog: boolean;
  showGit: boolean;
  onToggleLog: () => void;
  onToggleGit: () => void;
  getDayStatus: (date: Date) => DayStatus;
  getDayIcon: (status: DayStatus) => string;
  getDayColorClass: (status: DayStatus) => string;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  goToToday: () => void;
}

export const MonthlyCalendar = ({
  monthLabel,
  calendarDays,
  firstDayOfWeek,
  showLog,
  showGit,
  onToggleLog,
  onToggleGit,
  getDayStatus,
  getDayIcon,
  getDayColorClass,
  goToPreviousMonth,
  goToNextMonth,
  goToToday,
}: MonthlyCalendarProps) => {
  const { t } = useTranslation();
  const weekDays = [
    t("calendar.weekDays.sun"),
    t("calendar.weekDays.mon"),
    t("calendar.weekDays.tue"),
    t("calendar.weekDays.wed"),
    t("calendar.weekDays.thu"),
    t("calendar.weekDays.fri"),
    t("calendar.weekDays.sat"),
  ];
  const today = new Date();

  const isToday = (date: Date) => {
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  return (
    <section className="w-full rounded-xl bg-bg-card p-4 shadow-sm">
      <header className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-text-main">
            {t("dashboard.monthlyActivityCalendar")}
          </h2>
          <div className="flex items-center gap-2">
            <Button
              onClick={goToPreviousMonth}
              className="rounded p-1 transition-colors hover:bg-bg-main"
              aria-label={t("dashboard.previousMonth")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-text-sub"
              >
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
            <Button
              onClick={goToToday}
              className="px-2 py-1 text-xs text-text-sub transition-colors hover:text-text-main"
            >
              {t("common.today")}
            </Button>
            <Button
              onClick={goToNextMonth}
              className="rounded p-1 transition-colors hover:bg-bg-main"
              aria-label={t("dashboard.nextMonth")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-text-sub"
              >
                <path
                  d="M6 4L10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
        </div>
        <p className="text-xs text-text-sub">{monthLabel}</p>
      </header>

      {/* 토글 버튼 */}
      <div className="mb-4 flex gap-2">
        <Button
          onClick={onToggleLog}
          className={`flex-1 rounded-lg px-3 py-1.5 text-xs transition-colors ${showLog ? "bg-logit-log text-white" : "bg-bg-main text-text-sub"
            }`}
        >
          {t("dashboard.log")}
        </Button>
        <Button
          onClick={onToggleGit}
          className={`flex-1 rounded-lg px-3 py-1.5 text-xs transition-colors ${showGit ? "bg-logit-git text-white" : "bg-bg-main text-text-sub"
            }`}
        >
          {t("dashboard.git")}
        </Button>
      </div>

      {/* 달력 그리드 */}
      <div className="w-full">
        {/* 요일 헤더 */}
        <div className="mb-1 grid grid-cols-7 gap-1">
          {weekDays.map((day, index) => (
            <div
              key={day}
              className={`py-1 text-center text-xs font-medium ${index === 0
                  ? "text-status-danger"
                  : index === 6
                    ? "text-logit-log"
                    : "text-text-sub"
                }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7 gap-1">
          {/* 첫 날의 요일에 맞춰 빈 칸 추가 */}
          {Array.from({ length: firstDayOfWeek }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`empty-${index}`} className="aspect-square" />
          ))}
          {/* 현재 달의 날짜들 */}
          {calendarDays.map((date) => {
            const status = getDayStatus(date);
            const icon = getDayIcon(status);
            const colorClass = getDayColorClass(status);
            const isTodayDate = isToday(date);

            return (
              <div
                key={date.toISOString()}
                className={`flex aspect-square flex-col items-center justify-center rounded text-xs text-text-main transition-colors ${isTodayDate ? "ring-2 ring-logit-log" : "hover:bg-bg-main"
                  }`}
              >
                <span className="mb-0.5 text-[10px] font-medium">
                  {date.getDate()}
                </span>
                <span className={`text-sm font-bold ${colorClass}`}>{icon}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 범례 */}
      <div className="mt-4 border-t border-border-main pt-4">
        <div className="flex items-center justify-center gap-4 text-xs text-text-sub">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-status-success">✓</span>
            <span>{DUAL_STATUS.BOTH}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-status-warning">△</span>
            <span>{DUAL_STATUS.ONE}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-status-danger">✗</span>
            <span>{DUAL_STATUS.NONE}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

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


