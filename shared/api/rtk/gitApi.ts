import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlBaseQuery } from "@/shared/api/graphql/baseQuery";
import {
  GithubContributionsDocument,
  GithubUserDocument,
  type GithubContributionsQuery,
  type GithubContributionsQueryVariables,
  type GithubUserQuery,
  type GithubUserQueryVariables,
} from "@/shared/api/graphql/__generated__/graphql";

const GITHUB_STALE_SECONDS = 20 * 60; // 20 minutes

export const gitApi = createApi({
  reducerPath: "gitApi",
  baseQuery: graphqlBaseQuery,
  keepUnusedDataFor: GITHUB_STALE_SECONDS,
  refetchOnMountOrArgChange: GITHUB_STALE_SECONDS,
  refetchOnFocus: false,
  refetchOnReconnect: false,
  endpoints: (builder) => ({
    getGithubUser: builder.query<GithubUserQuery, GithubUserQueryVariables>({
      query: (variables) => ({
        document: GithubUserDocument,
        variables,
      }),
    }),
    getGithubContributions: builder.query<
      GithubContributionsQuery,
      GithubContributionsQueryVariables
    >({
      query: (variables) => ({
        document: GithubContributionsDocument,
        variables,
      }),
    }),
  }),
});

export const { useGetGithubUserQuery, useGetGithubContributionsQuery } = gitApi;
