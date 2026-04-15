"use client";

import {
  IconMoon,
  IconSettings,
  IconSun,
  IconUser,
  IconRefresh,
} from "@tabler/icons-react";
import { Button } from "@/shared/ui";
import { useTranslation } from "react-i18next";

export interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onClickLogin: () => void;
  onClickSetting: () => void;
  onClickRefresh: () => void;
}

export const Header = ({
  isDark,
  onToggleTheme,
  onClickLogin,
  onClickSetting,
  onClickRefresh,
}: HeaderProps) => {
  const { t } = useTranslation();
  return (
    <header className="w-full border-b border-border-main bg-bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <div className="text-lg font-semibold text-text-main">
          {t("common.appName")}
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={onClickRefresh}
            aria-label={t("common.refresh")}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-main bg-bg-card transition-all duration-200 hover:bg-bg-main hover:shadow-sm active:scale-95 cursor-pointer"
          >
            <IconRefresh size={20} className="text-text-main" strokeWidth={2} />
          </Button>
          <Button
            onClick={onClickSetting}
            aria-label={t("common.settings")}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-main bg-bg-card transition-all duration-200 hover:bg-bg-main hover:shadow-sm active:scale-95 cursor-pointer"
          >
            <IconSettings
              size={20}
              className="text-text-main"
              strokeWidth={2}
            />
          </Button>
          <Button
            onClick={onClickLogin}
            aria-label={t("common.login")}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-main bg-bg-card transition-all duration-200 hover:bg-bg-main hover:shadow-sm active:scale-95 cursor-pointer"
          >
            <IconUser size={20} className="text-text-main" strokeWidth={2} />
          </Button>
          <Button
            onClick={onToggleTheme}
            aria-label={isDark ? t("common.lightMode") : t("common.darkMode")}
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
