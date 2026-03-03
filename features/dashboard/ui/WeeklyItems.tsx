"use client";

import { DUAL_STATUS } from "@/shared/type/common.type";
import { useTranslation } from "react-i18next";
import { useGithubActivity } from "../model/useGithubActivity";
import { WeeklyItem } from "./WeeklyItem";

type TraceItem = {
  /** 예: "01.29 Wed" */
  dateLabel: string;
  /** 로그 제목 또는 첫 줄. 없으면 "기록 없음" 표시 */
  logTitle?: string | null;
  /** 해당 날짜의 커밋 개수 */
  commitCount: number;
};

export type WeeklyItemsProps = {
  items?: TraceItem[];
};


export const WeeklyItems = ({ items }: WeeklyItemsProps) => {
  const { t } = useTranslation();

  return (
    <section className="w-full rounded-xl bg-bg-card px-8 py-6 shadow-sm">
      <header className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-text-main">{t("dashboard.weeklyFlow")}</h2>
          <p className="text-xs text-text-sub">{t("dashboard.weeklyFlowDescription")}</p>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-text-sub">
          <div className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-status-success" />
            <span>{DUAL_STATUS.BOTH}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-status-warning" />
            <span>{DUAL_STATUS.ONE}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-status-danger" />
            <span>{DUAL_STATUS.NONE}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-col divide-y divide-border-main">
        {items && items.length > 0 ? (
          items.map((item) => {
            return (
              <WeeklyItem
                key={item.dateLabel}
                dateLabel={item.dateLabel}
                logTitle={item.logTitle}
                commitCount={item.commitCount}
              />
            );
          })
        ) : (
          <div className="py-4 text-center text-xs text-text-sub">{t("dashboard.weeklyEmptyMessage")}</div>
        )}
      </div>
    </section>
  );
};

export const WeeklyItemsContainer = () => {
  const { weeklyItems } = useGithubActivity();

  return <WeeklyItems items={weeklyItems} />;
};
