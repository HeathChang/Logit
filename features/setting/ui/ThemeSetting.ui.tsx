"use client";

import { Button } from "@/shared/ui";

export interface ThemeSettingProps {
  theme: string;
  onToggleTheme: () => void;
}

export const ThemeSetting = ({ theme, onToggleTheme }: ThemeSettingProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-0.5">
        <label className="text-xs font-medium text-text-main">테마</label>
        <p className="text-[11px] text-text-sub">
          다크 모드와 라이트 모드를 전환할 수 있습니다.
        </p>
      </div>
      <Button
        onClick={onToggleTheme}
        className="h-9 rounded-lg border border-border-main bg-bg-main px-4 text-xs font-medium text-text-main transition-colors hover:border-logit-log hover:text-logit-log"
      >
        {theme === "dark" ? "라이트 모드" : "다크 모드"}
      </Button>
    </div>
  );
};
