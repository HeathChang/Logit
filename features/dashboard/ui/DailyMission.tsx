import MissionCard from "@/shared/ui/MissionCard";

const DailyMission = () => {
    return (
        <div className='flex flex-row justify-between px-8 py-4'>
            <div className=''>
                <MissionCard title='Log' isSuccess={true} />
            </div>
            <div className=''>
                <MissionCard title='Git' isSuccess={true} />
            </div>
            <div className='ml-8'>
                <MissionCard title='Free to Go' isSuccess={true} />
            </div>
        </div>
    );
};

export default DailyMission;

