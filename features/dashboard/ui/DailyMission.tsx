"use client";

import { IconEqual, IconPlus } from "@tabler/icons-react";
import { MissionCard } from "@/shared/ui/MissionCard";
import { useTranslation } from "react-i18next";

export const DailyMission = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row items-center justify-center gap-6 rounded-lg border border-border-main bg-bg-card px-8 py-6 shadow-sm">
      <MissionCard title={t("dashboard.log")} isSuccess={true} />
      <div className="flex items-center justify-center text-text-sub">
        <IconPlus size={28} strokeWidth={1.5} className="opacity-60" />
      </div>
      <MissionCard title={t("dashboard.git")} isSuccess={true} />
      <div className="flex items-center justify-center text-text-sub">
        <IconEqual size={28} strokeWidth={1.5} className="opacity-60" />
      </div>
      <MissionCard title={t("dashboard.freeToGo")} isSuccess={true} />
    </div>
  );
};

