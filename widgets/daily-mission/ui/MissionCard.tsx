import { IconCheck } from "@tabler/icons-react";

interface MissionCardProps {
    title: string;
    status: string;
}

const MissionCard = ({ title, status }: MissionCardProps) => {
    return (
        <div>
            <h1>{title}</h1>
            <IconCheck className='text-status-success stroke-current' />
        </div>
    );
};

export default MissionCard;