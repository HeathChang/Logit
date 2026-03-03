import { useEffect, useState } from "react";
import _ from "lodash";
import GitApi from "@/shared/api/apis/GitApi";

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
    const savedUsername =
      localStorage.getItem("settings.githubUsername") ??
      "";

    if (savedUsername) {
      setGithubUsername(savedUsername);
    }
  }, []);


  useEffect(() => {
    if (!githubUsername) {
      setGitUserInfo(null);
      setIsGithubUsernameValid(false);
      return;
    }

    const fetchUser = _.debounce(async (username: string) => {
      setIsLoading(true);
      try {
        const result = await GitApi.getGitUserInfo(username);

        if (result.status === 200) {
          setIsGithubUsernameValid(true);
          setGitUserInfo(result.data as GithubUser);
        } else {
          setIsGithubUsernameValid(false);
          setGitUserInfo(null);
        }
      } catch {
        setIsGithubUsernameValid(false);
        setGitUserInfo(null);
      } finally {
        setIsLoading(false);
      }
    }, 1000);

    fetchUser(githubUsername);

    return () => {
      fetchUser.cancel();
    };
  }, [githubUsername]);

  return {
    githubUsername,
    setGithubUsername,
    gitUserInfo,
    isGithubUsernameValid,
    isLoading,
  };
};

