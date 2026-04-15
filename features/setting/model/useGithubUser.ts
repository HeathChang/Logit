import { useEffect, useState } from "react";
import _ from "lodash";
import { useGetGitUserInfoQuery } from "@/shared/api";

type GithubUser = {
  login: string;
  name: string | null;
  avatar_url: string | null;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  company: string | null;
  location: string | null;
};

export const useGithubUser = (initialUsername = "") => {
  const [githubUsername, setGithubUsername] = useState(initialUsername);
  const [gitUserInfo, setGitUserInfo] = useState<GithubUser | null>(null);
  const [isGithubUsernameValid, setIsGithubUsernameValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem("settings.githubUsername") ?? "";

    if (savedUsername) {
      setTimeout(() => {
        setGithubUsername(savedUsername);
      }, 0);
    }
  }, []);
  useEffect(() => {
    if (!githubUsername) {
      setGitUserInfo(null);
      setIsGithubUsernameValid(false);
      return;
    }

    const fetchUser = _.debounce((username: string) => {
      setIsLoading(true);
    }, 300);

    fetchUser(githubUsername);

    return () => {
      fetchUser.cancel();
    };
  }, [githubUsername]);

  const {
    data,
    isLoading: isQueryLoading,
    isError,
  } = useGetGitUserInfoQuery(githubUsername, {
    skip: !githubUsername,
  });

  useEffect(() => {
    if (!githubUsername) {
      setGitUserInfo(null);
      setIsGithubUsernameValid(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(isQueryLoading);

    if (data && !isError) {
      setIsGithubUsernameValid(true);
      setGitUserInfo(data as GithubUser);
    } else if (isError) {
      setIsGithubUsernameValid(false);
      setGitUserInfo(null);
    }
  }, [data, isError, isQueryLoading, githubUsername]);

  return {
    githubUsername,
    setGithubUsername,
    gitUserInfo,
    isGithubUsernameValid,
    isLoading,
  };
};
