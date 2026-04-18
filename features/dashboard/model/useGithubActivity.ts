"use client";

import { useEffect, useMemo, useState } from "react";
import { gitApi } from "@/shared/api";
import { store } from "@/shared/store";

export type GitCalendarPoint = {
  date: string;
  count: number;
};

export type WeeklyTraceItem = {
  dateLabel: string;
  logTitle: string | null;
  commitCount: number;
};

type GithubPushEvent = {
  type: string;
  created_at: string;
  payload?: {
    distinct_size?: number;
    commits?: Array<{ message?: string }>;
  };
};

const SETTING_GITHUB_USERNAME_KEY = "settings.githubUsername";
const DAYS_IN_WEEK = 7;
const EVENT_PAGE_SIZE = 100;
const MAX_EVENT_PAGES = 10;

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

export const useGithubActivity = () => {
  const [username, setUsername] = useState("");
  const [events, setEvents] = useState<GithubPushEvent[]>([]);

  const [endDate] = useState(() => new Date());
  const [startDate] = useState(() => getThreeMonthsAgo(endDate));

  useEffect(() => {
    const targetUsername =
      typeof window !== "undefined"
        ? (localStorage.getItem(SETTING_GITHUB_USERNAME_KEY) ?? "")
        : "";

    setTimeout(() => {
      setUsername(targetUsername);
    }, 0);
  }, []);

  useEffect(() => {
    if (!username) {
      return;
    }

    const fetchEvents = async () => {
      try {
        const allEvents: GithubPushEvent[] = [];

        for (let page = 1; page <= MAX_EVENT_PAGES; page += 1) {
          const result = await store.dispatch(
            gitApi.endpoints.getUserEvents.initiate({
              username,
              page,
              perPage: EVENT_PAGE_SIZE,
            }),
          );
          const pageEvents = (result.data ?? []) as GithubPushEvent[];
          if (pageEvents.length === 0) break;

          allEvents.push(...pageEvents);

          const hasOlderEvent = pageEvents.some(
            (event) => new Date(event.created_at) < startDate,
          );
          if (hasOlderEvent) break;

          if (
            "unsubscribe" in result &&
            typeof result.unsubscribe === "function"
          ) {
            result.unsubscribe();
          }
        }

        setEvents(allEvents);
      } catch (error) {
        console.error("Failed to fetch GitHub events:", error);
        setEvents([]);
      }
    };

    fetchEvents();
  }, [username, startDate]);

  const commitsByDate = useMemo(() => {
    const grouped = new Map<string, { count: number; messages: string[] }>();

    events.forEach((event) => {
      if (event.type !== "PushEvent") return;

      const eventDate = new Date(event.created_at);
      if (eventDate < startDate || eventDate > endDate) return;

      const dateKey = toIsoDate(eventDate);
      const previous = grouped.get(dateKey) ?? { count: 0, messages: [] };

      const commitCount =
        event.payload?.distinct_size ??
        event.payload?.commits?.length ??
        0;
      const messages = (event.payload?.commits ?? [])
        .map((commit) => commit.message?.trim() ?? "")
        .filter((message) => message.length > 0);

      const existingMessages = new Set(previous.messages);
      const newMessages = messages.filter((msg) => !existingMessages.has(msg));

      grouped.set(dateKey, {
        count: previous.count + commitCount,
        messages: [...previous.messages, ...newMessages],
      });
    });

    return grouped;
  }, [endDate, events, startDate]);

  const calendarValues = useMemo<GitCalendarPoint[]>(() => {
    return Array.from(commitsByDate.entries())
      .filter(([, value]) => value.count > 0)
      .map(([date, value]) => ({ date, count: value.count }));
  }, [commitsByDate]);

  const weeklyItems = useMemo<WeeklyTraceItem[]>(() => {
    const weekStart = getWeekStart(endDate);

    return Array.from({ length: DAYS_IN_WEEK }, (_, index) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + index);

      const dateKey = toIsoDate(date);
      const data = commitsByDate.get(dateKey);

      const firstMessage = data?.messages?.[0] ?? null;
      const remainedCount = Math.max((data?.messages?.length ?? 0) - 1, 0);
      const logTitle =
        firstMessage && remainedCount > 0
          ? `${firstMessage} (+${remainedCount})`
          : firstMessage;

      return {
        dateLabel: toWeeklyDateLabel(date),
        logTitle,
        commitCount: data?.count ?? 0,
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
