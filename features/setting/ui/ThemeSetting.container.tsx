"use client";

import { useTheme } from "@/shared/config/theme/ThemeProvider";
import { ThemeSetting } from "./ThemeSetting.ui";

export const ThemeSettingContainer = () => {
  const { theme, toggleTheme } = useTheme();

  return <ThemeSetting theme={theme} onToggleTheme={toggleTheme} />;
};
