import { IconCheck, IconX } from "@tabler/icons-react";

export interface MissionCardProps {
  title: string;
  isSuccess: boolean;
}

export const MissionCard = ({ title, isSuccess }: MissionCardProps) => {
  return (
    <div className="flex w-[200px] flex-col items-center justify-center gap-3 rounded-lg border border-border-main bg-bg-card px-6 py-5 shadow-sm transition-all duration-200 hover:border-status-success/30 hover:shadow-md">
      <h1 className="text-xl font-semibold text-text-main">{title}</h1>
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full ${
          isSuccess ? "bg-status-success/10" : "bg-status-danger/10"
        } transition-all duration-200`}
      >
        {isSuccess ? (
          <IconCheck
            className="text-status-success"
            size={28}
            strokeWidth={2.5}
          />
        ) : (
          <IconX
            className="text-status-danger"
            size={28}
            strokeWidth={2.5}
          />
        )}
      </div>
    </div>
  );
};

