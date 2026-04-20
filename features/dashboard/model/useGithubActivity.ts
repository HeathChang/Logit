"use client";

import { useEffect, useMemo, useState } from "react";
import { useGetGithubContributionsQuery } from "@/shared/api";
import type { GithubContributionsQuery } from "@/shared/api";

export type GitCalendarPoint = {
  date: string;
  count: number;
};

export type WeeklyTraceItem = {
  dateLabel: string;
  logTitle: string | undefined;
  commitCount: number;
};

const SETTING_GITHUB_USERNAME_KEY = "settings.githubUsername";
const DAYS_IN_WEEK = 7;

const toIsoDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const toWeeklyDateLabel = (date: Date) => {
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
  return `${mm}.${dd} ${dayName}`;
};

const getWeekStart = (date: Date) => {
  const current = new Date(date);
  const day = current.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  current.setDate(current.getDate() + diff);
  current.setHours(0, 0, 0, 0);
  return current;
};

const getThreeMonthsAgo = (date: Date) => {
  const start = new Date(date);
  start.setMonth(start.getMonth() - 3);
  start.setHours(0, 0, 0, 0);
  return start;
};

type ContributionDay = {
  date: string;
  count: number;
};

const flattenContributionDays = (
  data: GithubContributionsQuery | undefined,
): ContributionDay[] => {
  const weeks =
    data?.user?.contributionsCollection.contributionCalendar.weeks ?? [];
  return weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
    })),
  );
};

export const useGithubActivity = () => {
  const [username, setUsername] = useState("");

  const [endDate] = useState(() => new Date());
  const [startDate] = useState(() => getThreeMonthsAgo(endDate));

  useEffect(() => {
    if (typeof window === "undefined") return;
    const targetUsername =
      localStorage.getItem(SETTING_GITHUB_USERNAME_KEY) ?? "";
    setUsername(targetUsername);
  }, []);

  const { data } = useGetGithubContributionsQuery(
    {
      login: username,
      from: startDate.toISOString(),
      to: endDate.toISOString(),
    },
    { skip: !username },
  );

  const contributionDays = useMemo(() => flattenContributionDays(data), [data]);

  const commitsByDate = useMemo(() => {
    const map = new Map<string, number>();
    for (const day of contributionDays) {
      if (day.count <= 0) continue;
      map.set(day.date, day.count);
    }
    return map;
  }, [contributionDays]);

  const calendarValues = useMemo<GitCalendarPoint[]>(() => {
    return Array.from(commitsByDate.entries()).map(([date, count]) => ({
      date,
      count,
    }));
  }, [commitsByDate]);

  const weeklyItems = useMemo<WeeklyTraceItem[]>(() => {
    const weekStart = getWeekStart(endDate);

    return Array.from({ length: DAYS_IN_WEEK }, (_unused, index) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + index);

      const dateKey = toIsoDate(date);
      const count = commitsByDate.get(dateKey) ?? 0;

      return {
        dateLabel: toWeeklyDateLabel(date),
        logTitle: undefined,
        commitCount: count,
      };
    });
  }, [commitsByDate, endDate]);

  return {
    username,
    startDate,
    endDate,
    calendarValues,
    weeklyItems,
  };
};
