import { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { useGetGithubUserQuery } from "@/shared/api";
import type { GithubUserQuery } from "@/shared/api";

type GithubUserNode = NonNullable<GithubUserQuery["user"]>;

export type GithubUserProfile = {
  login: string;
  name: string | undefined;
  avatarUrl: string | undefined;
  htmlUrl: string;
  bio: string | undefined;
  publicRepos: number;
  followers: number;
  following: number;
  company: string | undefined;
  location: string | undefined;
};

const SETTING_GITHUB_USERNAME_KEY = "settings.githubUsername";

const toProfile = (user: GithubUserNode): GithubUserProfile => ({
  login: user.login,
  name: user.name ?? undefined,
  avatarUrl: user.avatarUrl,
  htmlUrl: user.url,
  bio: user.bio ?? undefined,
  publicRepos: user.repositories.totalCount,
  followers: user.followers.totalCount,
  following: user.following.totalCount,
  company: user.company ?? undefined,
  location: user.location ?? undefined,
});

export const useGithubUser = (initialUsername = "") => {
  const [githubUsername, setGithubUsername] = useState(initialUsername);
  const [debouncedUsername, setDebouncedUsername] = useState(initialUsername);

  useEffect(() => {
    const savedUsername =
      localStorage.getItem(SETTING_GITHUB_USERNAME_KEY) ?? "";

    if (savedUsername) {
      setGithubUsername(savedUsername);
      setDebouncedUsername(savedUsername);
    }
  }, []);

  useEffect(() => {
    const applyDebounced = _.debounce((value: string) => {
      setDebouncedUsername(value);
    }, 300);

    applyDebounced(githubUsername);

    return () => {
      applyDebounced.cancel();
    };
  }, [githubUsername]);

  const {
    data,
    isFetching,
    isError,
  } = useGetGithubUserQuery(
    { login: debouncedUsername },
    { skip: !debouncedUsername },
  );

  const gitUserInfo = useMemo<GithubUserProfile | undefined>(() => {
    if (!data?.user) return undefined;
    return toProfile(data.user);
  }, [data]);

  const isGithubUsernameValid = Boolean(gitUserInfo) && !isError;
  const isLoading = Boolean(debouncedUsername) && isFetching;

  return {
    githubUsername,
    setGithubUsername,
    gitUserInfo,
    isGithubUsernameValid,
    isLoading,
  };
};
