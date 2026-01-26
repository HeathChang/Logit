import MissionCard from "@/widgets/daily-mission/ui/MissionCard";

const DailyMission = () => {
    return (
        <div className='flex flex-row justify-between px-8 py-4'>
            <div className=''>
                <MissionCard title='Log' status='' />

            </div>
            <div className=''>
                <MissionCard title='Git' status='' />
            </div>
            <div className=''>
                <MissionCard title='Free to Go' status='' />
            </div>
        </div>
    );
};

export default DailyMission;