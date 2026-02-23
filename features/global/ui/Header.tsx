"use client";

import { useRouter } from "next/navigation";
import { IconMoon, IconSettings, IconSun, IconUser, IconRefresh } from "@tabler/icons-react";
import { useTheme } from "@/shared/config/theme/ThemeProvider";
import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";

export interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onClickLogin: () => void;
  onClickSetting: () => void;
  onClickRefresh: () => void;
}

export const Header = ({ isDark, onToggleTheme, onClickLogin, onClickSetting, onClickRefresh }: HeaderProps) => {
  const { t } = useTranslation();
  return (
    <header className="w-full border-b border-border-main bg-bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <div className="text-lg font-semibold text-text-main">{t("common.appName")}</div>
        <div className="flex items-center gap-4">
          <Button
            onClick={onClickRefresh}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-main bg-bg-card transition-all duration-200 hover:bg-bg-main hover:shadow-sm active:scale-95 cursor-pointer"
          >
            <IconRefresh size={20} className="text-text-main" strokeWidth={2} />
          </Button>
          <Button onClick={onClickSetting} className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-main bg-bg-card transition-all duration-200 hover:bg-bg-main hover:shadow-sm active:scale-95 cursor-pointer">
            <IconSettings size={20} className="text-text-main" strokeWidth={2} />
          </Button>
          <Button
            onClick={onClickLogin}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-main bg-bg-card transition-all duration-200 hover:bg-bg-main hover:shadow-sm active:scale-95 cursor-pointer"
          >
            <IconUser size={20} className="text-text-main" strokeWidth={2} />
          </Button>
          <Button
            onClick={onToggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-main bg-bg-card transition-all duration-200 hover:bg-bg-main hover:shadow-sm active:scale-95 cursor-pointer"
          >
            {isDark ? (
              <IconSun size={20} className="text-text-main" strokeWidth={2} />
            ) : (
              <IconMoon size={20} className="text-text-main" strokeWidth={2} />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

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

  // TODO:: 추후 React-Query를 사용하여 구현
  const onClickRefresh = () => {
    console.log("onClickRefresh");
  };

  return <Header isDark={isDark} onToggleTheme={toggleTheme} onClickLogin={onClickLogin} onClickSetting={onClickSetting} onClickRefresh={onClickRefresh} />;
};

