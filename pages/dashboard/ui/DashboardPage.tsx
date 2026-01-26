import LogEditor from "@/features/log/write-log/ui/LogEditor";
import DailyMission from "@/widgets/daily-mission/ui/DailyMission";
import GitCalendar from "@/widgets/monthly-git/ui/GitCalendar";
import WeeklyItems from "@/widgets/weekly-trace/ui/WeeklyItems";

const DashboardPage = () => {
    return (
        <div className="min-h-screen bg-bg-main">
            <div className="w-full max-w-7xl mx-auto px-4 py-6">
                <div className="flex gap-6">
                    <main className="flex-1 max-w-4xl border border-red-500 min-w-[720px]">
                        <div className="">
                            <DailyMission />
                        </div>
                        <div className="">
                            <LogEditor />
                        </div>
                        <div className="">
                            <WeeklyItems />
                        </div>
                    </main>

                    <aside className="hidden min-[720px]:block w-80 flex-shrink-0 border border-blue-500 sticky top-0 self-start h-100">
                        <GitCalendar />
                    </aside>
                </div>
            </div >
        </div >
    );
};

export default DashboardPage;