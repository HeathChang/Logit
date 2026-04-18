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
  }),
});

export const { useGetGitUserInfoQuery, useGetUserEventsQuery } = gitApi;
