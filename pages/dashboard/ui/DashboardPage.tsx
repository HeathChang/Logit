import GitCalendar from "@/features/dashboard/ui/GitCalendar";
import WeeklyItems from "@/features/dashboard/ui/WeeklyItems";
import LogEditor from "@/features/dashboard/ui/LogEditor";
import DailyMission from "@/features/dashboard/ui/DailyMission";


const DashboardPage = () => {
    return (
        <div className="min-h-screen bg-bg-main">
            <div className="w-full max-w-7xl mx-auto px-4 py-6">
                <div className="flex gap-6 justify-center">
                    <main className="border border-red-500 min-w-[720px] flex flex-col gap-6 ">
                        <div className="border-1 border-yellow-500">
                            <DailyMission />
                        </div>
                        <div className="border-1 border-blue-500">
                            <LogEditor />
                        </div>
                        <div className="border-1 border-green-500">
                            <WeeklyItems />
                        </div>
                    </main>

                    <aside className="hidden min-[1080px]:block w-80 flex-shrink-0 border border-blue-500 sticky top-0 self-start h-100">
                        <GitCalendar />
                    </aside>
                </div>
            </div >
        </div >
    );
};

export default DashboardPage;