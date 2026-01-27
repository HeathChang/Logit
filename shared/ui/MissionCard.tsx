import { IconCheck, IconX } from "@tabler/icons-react";

interface MissionCardProps {
    title: string;
    isSuccess: boolean;
}

const MissionCard = ({ title, isSuccess }: MissionCardProps) => {

    return (
        <div className="flex flex-col items-center gap-2 border w-[200px]">
            <h1 className="text-2xl font-bold">{title}</h1>
            {isSuccess ? (
                <IconCheck className="text-status-success" size={36} />
            ) : (
                <IconX className="text-status-danger" size={36} />
            )}
        </div>
    );
};

export default MissionCard;

