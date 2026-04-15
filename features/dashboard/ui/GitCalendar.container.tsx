"use client";

import { useGitCalendar } from "../model/useGitCalendar";
import { GitCalendar } from "./GitCalendar.ui";

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
