"use client";

import { useEffect, useMemo, useState } from "react";
import { gitApi } from "@/shared/api/rtk/gitApi";
import { store } from "@/shared/store/store";

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

type GithubRepository = {
    name: string;
    full_name: string;
    owner: {
        login: string;
    };
    private: boolean;
};

type GithubCommit = {
    sha: string;
    commit: {
        message: string;
        author: {
            name: string;
            email: string;
            date: string;
        };
    };
    author: {
        login: string;
    } | null;
};

const SETTING_GITHUB_USERNAME_KEY = "settings.githubUsername";
const DAYS_IN_WEEK = 7;
const EVENT_PAGE_SIZE = 100;
const MAX_EVENT_PAGES = 10;
const MAX_REPO_PAGES = 10;
const MAX_COMMIT_PAGES_PER_REPO = 5;

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
    const [commits, setCommits] = useState<GithubCommit[]>([]);

    const [endDate] = useState(() => new Date());
    const [startDate] = useState(() => getThreeMonthsAgo(endDate));

    useEffect(() => {
        const targetUsername = typeof window !== "undefined"
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

        const fetchAllCommits = async () => {
            try {
                // 1. 사용자의 모든 레포지토리 가져오기 (RTK Query 사용)
                const allRepos: GithubRepository[] = [];
                for (let page = 1; page <= MAX_REPO_PAGES; page += 1) {
                    const result = await store.dispatch(
                        gitApi.endpoints.getUserRepos.initiate({
                            username,
                            page,
                            perPage: EVENT_PAGE_SIZE,
                        }),
                    );
                    const response = result;
                    const pageRepos = (response.data ?? []) as GithubRepository[];
                    if (pageRepos.length === 0) break;
                    allRepos.push(...pageRepos);

                    if ("unsubscribe" in result && typeof result.unsubscribe === "function") {
                        result.unsubscribe();
                    }
                }

                console.log(`Found ${allRepos.length} repositories for ${username}`);

                // 2. 각 레포지토리의 커밋 가져오기 (RTK Query 사용)
                const allCommits: GithubCommit[] = [];
                const sinceDate = startDate.toISOString();

                for (const repo of allRepos) {
                    try {
                        // Public 레포지토리만 처리 (private은 인증 필요)
                        if (repo.private) continue;

                        for (let page = 1; page <= MAX_COMMIT_PAGES_PER_REPO; page++) {
                            const result = await store.dispatch(
                                gitApi.endpoints.getRepoCommits.initiate({
                                    owner: repo.owner.login,
                                    repo: repo.name,
                                    page,
                                    perPage: EVENT_PAGE_SIZE,
                                    since: sinceDate,
                                }),
                            );
                            const response = result;
                            const pageCommits = (response.data ?? []) as GithubCommit[];
                            if (pageCommits.length === 0) break;

                            // 날짜 필터링 (API의 since 파라미터가 정확하지 않을 수 있음)
                            const filteredCommits = pageCommits.filter((commit) => {
                                const commitDate = new Date(commit.commit.author.date);
                                return commitDate >= startDate && commitDate <= endDate;
                            });

                            allCommits.push(...filteredCommits);

                            // 마지막 커밋이 startDate보다 이전이면 중단
                            if (pageCommits.length > 0) {
                                const lastCommitDate = new Date(
                                    pageCommits[pageCommits.length - 1].commit.author.date,
                                );
                                if (lastCommitDate < startDate) break;
                            }

                            if ("unsubscribe" in result && typeof result.unsubscribe === "function") {
                                result.unsubscribe();
                            }
                        }
                        // API rate limit 방지를 위한 짧은 딜레이
                        await new Promise((resolve) => setTimeout(resolve, 100));
                    } catch (error) {
                        console.warn(`Failed to fetch commits from ${repo.full_name}:`, error);
                    }
                }
                console.log(`Fetched ${allCommits.length} commits from all repositories`);
                setCommits(allCommits);

                // 3. Events API도 병행하여 사용 (추가 데이터 수집, RTK Query 사용)
                const allEvents: GithubPushEvent[] = [];

                for (let page = 1; page <= MAX_EVENT_PAGES; page += 1) {
                    const result = await store.dispatch(
                        gitApi.endpoints.getUserEvents.initiate({
                            username,
                            page,
                            perPage: EVENT_PAGE_SIZE,
                        }),
                    );
                    const response = result;
                    const pageEvents = (response.data ?? []) as GithubPushEvent[];
                    if (pageEvents.length === 0) break;
                    allEvents.push(...pageEvents);
                    const hasOlderEvent = pageEvents.some((event) => {
                        return new Date(event.created_at) < startDate;
                    });

                    if (hasOlderEvent) {
                        break;
                    }

                    if ("unsubscribe" in result && typeof result.unsubscribe === "function") {
                        result.unsubscribe();
                    }
                }

                console.log("allEvents", allEvents);
                setEvents(allEvents);
            } catch (error) {
                console.error("Failed to fetch commits:", error);
                setCommits([]);
                setEvents([]);
            }
        };

        fetchAllCommits();
    }, [username, startDate, endDate]);

    const commitsByDate = useMemo(() => {
        const grouped = new Map<string, { count: number; messages: string[] }>();

        // 1. Commits API에서 가져온 커밋 데이터 처리
        commits.forEach((commit) => {
            const commitDate = new Date(commit.commit.author.date);
            if (commitDate < startDate || commitDate > endDate) {
                return;
            }

            const dateKey = toIsoDate(commitDate);
            const previous = grouped.get(dateKey) ?? { count: 0, messages: [] };

            const message = commit.commit.message?.trim() ?? "";
            if (message.length > 0) {
                grouped.set(dateKey, {
                    count: previous.count + 1,
                    messages: [...previous.messages, message],
                });
            }
        });

        // 2. Events API에서 가져온 이벤트 데이터 처리
        events.forEach((event) => {
            if (event.type !== "PushEvent") {
                return;
            }

            const eventDate = new Date(event.created_at);
            if (eventDate < startDate || eventDate > endDate) {
                return;
            }

            const dateKey = toIsoDate(eventDate);
            const previous = grouped.get(dateKey) ?? { count: 0, messages: [] };

            const messages = (event.payload?.commits ?? [])
                .map((commit) => commit.message?.trim() ?? "")
                .filter((message) => message.length > 0);

            // 중복 메시지 제거 (같은 날짜에 같은 메시지가 있으면 제외)
            const existingMessages = new Set(previous.messages);
            const newMessages = messages.filter((msg) => !existingMessages.has(msg));

            if (newMessages.length > 0 || messages.length > 0) {
                grouped.set(dateKey, {
                    count: previous.count + (newMessages.length > 0 ? newMessages.length : messages.length),
                    messages: [...previous.messages, ...newMessages],
                });
            }
        });

        console.log("commitsByDate:: ", grouped);
        return grouped;
    }, [endDate, events, commits, startDate]);

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
