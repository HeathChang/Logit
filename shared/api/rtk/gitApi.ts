import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const GITHUB_STALE_SECONDS = 20 * 60; // 20 minutes

export const gitApi = createApi({
    reducerPath: "gitApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.github.com",
        prepareHeaders: (headers) => {
            if (process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
                headers.set("Authorization", process.env.NEXT_PUBLIC_GITHUB_TOKEN);
            }
            return headers;
        },
    }),
    keepUnusedDataFor: GITHUB_STALE_SECONDS,
    refetchOnMountOrArgChange: GITHUB_STALE_SECONDS,
    refetchOnFocus: false,
    refetchOnReconnect: false,
    endpoints: (builder) => ({
        getGitUserInfo: builder.query<unknown, string>({
            query: (username) => `/users/${username}`,
        }),
        getUserEvents: builder.query<
            unknown,
            { username: string; page?: number; perPage?: number }
        >({
            query: ({ username, page = 1, perPage = 100 }) =>
                `/users/${username}/events/public?page=${page}&per_page=${perPage}`,
        }),
        getUserRepos: builder.query<
            unknown,
            { username: string; page?: number; perPage?: number }
        >({
            query: ({ username, page = 1, perPage = 100 }) =>
                `/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated&direction=desc`,
        }),
        getRepoCommits: builder.query<
            unknown,
            { owner: string; repo: string; page?: number; perPage?: number; since?: string }
        >({
            query: ({ owner, repo, page = 1, perPage = 100, since }) => {
                const params = new URLSearchParams({
                    page: String(page),
                    per_page: String(perPage),
                });
                if (since) {
                    params.set("since", since);
                }
                return `/repos/${owner}/${repo}/commits?${params.toString()}`;
            },
        }),
    }),
});

export const {
    useGetGitUserInfoQuery,
    useGetUserEventsQuery,
    useGetUserReposQuery,
    useGetRepoCommitsQuery,
} = gitApi;

