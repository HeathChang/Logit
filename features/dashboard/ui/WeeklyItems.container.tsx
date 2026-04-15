"use client";

import { useGithubActivity } from "../model/useGithubActivity";
import { WeeklyItems } from "./WeeklyItems.ui";

export const WeeklyItemsContainer = () => {
  const { weeklyItems } = useGithubActivity();

  return <WeeklyItems items={weeklyItems} />;
};
