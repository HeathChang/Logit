"use client";

import { useTranslation } from "react-i18next";
import { useLanguage } from "@/shared/hooks";

interface SettingFormProps {
  githubUsername: string;
  onGithubUsernameChange: (value: string) => void;
}

export const SettingForm = ({
  githubUsername,
  onGithubUsernameChange,
}: SettingFormProps) => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="setting-github-username"
          className="text-xs font-medium text-text-main"
        >
          {t("settings.githubUsername")}
        </label>
        <input
          id="setting-github-username"
          type="text"
          value={githubUsername}
          onChange={(e) => onGithubUsernameChange(e.target.value)}
          placeholder="your-github-username"
          autoComplete="off"
          className="h-9 rounded-lg border border-border-main bg-bg-main px-3 text-sm text-text-main outline-none transition-colors focus:border-logit-log"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="setting-language"
          className="text-xs font-medium text-text-main"
        >
          {t("settings.language")}
        </label>
        <select
          id="setting-language"
          value={language}
          onChange={(e) => setLanguage(e.target.value as "ko" | "en")}
          className="h-9 rounded-lg border border-border-main bg-bg-main px-3 text-sm text-text-main outline-none transition-colors focus:border-logit-log cursor-pointer"
        >
          <option value="ko">{t("settings.korean")}</option>
          <option value="en">{t("settings.english")}</option>
        </select>
      </div>
    </form>
  );
};
