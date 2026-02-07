"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "@/shared/config/theme/ThemeProvider";

export interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header = ({ isDark, onToggleTheme }: HeaderProps) => {
  return (
    <header className="w-full border-b border-border-main bg-bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <div className="text-lg font-semibold text-text-main">Logit</div>
        <button
          type="button"
          onClick={onToggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-main bg-bg-card transition-all duration-200 hover:bg-bg-main hover:shadow-sm active:scale-95"
          aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
        >
          {isDark ? (
            <IconSun size={20} className="text-text-main" strokeWidth={2} />
          ) : (
            <IconMoon size={20} className="text-text-main" strokeWidth={2} />
          )}
        </button>
      </div>
    </header>
  );
};

export const HeaderContainer = () => {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return <Header isDark={isDark} onToggleTheme={toggleTheme} />;
};

