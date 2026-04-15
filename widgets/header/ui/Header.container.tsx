"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "@/shared/config/theme/ThemeProvider";
import { Header } from "./Header.ui";

export const HeaderContainer = () => {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  const onClickLogin = () => {
    router.push("/login");
  };

  const onClickSetting = () => {
    router.push("/setting");
  };

  // TODO: 추후 데이터 refetch 로직 구현
  const onClickRefresh = () => {};

  return (
    <Header
      isDark={isDark}
      onToggleTheme={toggleTheme}
      onClickLogin={onClickLogin}
      onClickSetting={onClickSetting}
      onClickRefresh={onClickRefresh}
    />
  );
};
