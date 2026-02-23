"use client";

import ReactCalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

import { useGitCalendar } from "../model/useGitCalendar";
import { useTranslation } from "react-i18next";

export interface GitCalendarValue {
  date: string;
  count: number;
}

export interface GitCalendarProps {
  startDate: Date;
  endDate: Date;
  values: GitCalendarValue[];
  onClickDate: (value: unknown) => void;
  onMouseOver?: (value: unknown) => void;
}

export const GitCalendar = ({
  startDate,
  endDate,
  values,
  onClickDate,
  onMouseOver,
}: GitCalendarProps) => {
  const { t } = useTranslation();
  return (
    <section className="w-full rounded-xl bg-bg-card p-4 shadow-sm">
      <header className="mb-4">
        <h2 className="text-sm font-semibold text-text-main">
          {t("dashboard.gitActivityHistory")}
        </h2>
        <p className="mt-1 text-xs text-text-sub">
          {t("dashboard.gitActivityDescription")}
        </p>
      </header>
      <div className="overflow-x-auto">
        <ReactCalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={values}
          onClick={onClickDate}
          onMouseOver={onMouseOver}
        />
      </div>
    </section>
  );
};

export const GitCalendarContainer = () => {
  const { startDate, endDate, values, handleMouseOver, handleClickDate } =
    useGitCalendar();

  return (
    <GitCalendar
      startDate={startDate}
      endDate={endDate}
      values={values}
      onClickDate={handleClickDate}
      onMouseOver={handleMouseOver}
    />
  );
};

