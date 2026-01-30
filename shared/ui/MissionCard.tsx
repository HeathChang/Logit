import { IconCheck, IconX } from "@tabler/icons-react";

interface MissionCardProps {
    title: string;
    isSuccess: boolean;
}

const MissionCard = ({ title, isSuccess }: MissionCardProps) => {

    return (
        <div className="flex flex-col items-center justify-center gap-3 px-6 py-5 w-[200px] bg-bg-card rounded-lg border border-border-main shadow-sm transition-all duration-200 hover:shadow-md hover:border-status-success/30">
            <h1 className="text-xl font-semibold text-text-main">{title}</h1>
            <div className={`flex items-center justify-center w-12 h-12 rounded-full ${isSuccess ? 'bg-status-success/10' : 'bg-status-danger/10'} transition-all duration-200`}>
                {isSuccess ? (
                    <IconCheck className="text-status-success" size={28} strokeWidth={2.5} />
                ) : (
                    <IconX className="text-status-danger" size={28} strokeWidth={2.5} />
                )}
            </div>
        </div>
    );
};

export default MissionCard;

