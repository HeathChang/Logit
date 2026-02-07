"use client";

import ReactCalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

import { useGitCalendar } from "../model/useGitCalendar";

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
  return (
    <section className="w-full rounded-xl bg-bg-card p-4 shadow-sm">
      <header className="mb-4">
        <h2 className="text-sm font-semibold text-text-main">
          Git 활동 히스토리
        </h2>
        <p className="mt-1 text-xs text-text-sub">
          지난 30일간의 커밋 활동을 확인해보세요.
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

