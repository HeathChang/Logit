import { IconEqual, IconPlus } from "@tabler/icons-react";
import { MissionCard } from "@/shared/ui/MissionCard";

export const DailyMission = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-6 rounded-lg border border-border-main bg-bg-card px-8 py-6 shadow-sm">
      <MissionCard title="Log" isSuccess={true} />
      <div className="flex items-center justify-center text-text-sub">
        <IconPlus size={28} strokeWidth={1.5} className="opacity-60" />
      </div>
      <MissionCard title="Git" isSuccess={true} />
      <div className="flex items-center justify-center text-text-sub">
        <IconEqual size={28} strokeWidth={1.5} className="opacity-60" />
      </div>
      <MissionCard title="Free to Go" isSuccess={true} />
    </div>
  );
};

