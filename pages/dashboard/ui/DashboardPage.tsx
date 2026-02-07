import { GitCalendarContainer } from "@/features/dashboard/ui/GitCalendar";
import { MonthlyCalendarContainer } from "@/features/dashboard/ui/MonthlyCalendar";
import { WeeklyItems } from "@/features/dashboard/ui/WeeklyItems";
import { LogEditorContainer } from "@/features/dashboard/ui/LogEditor";
import { DailyMission } from "@/features/dashboard/ui/DailyMission";


const DashboardPage = () => {
    return (
        <div className="min-h-screen bg-bg-main">
            <div className="w-full max-w-7xl mx-auto px-4 py-6">
                <div className="flex gap-6 justify-center">
                    <main className="min-w-[720px] flex flex-col gap-6 ">
                        <div className="">
                            <DailyMission />
                        </div>
                        <div className="h-100">
                            <LogEditorContainer />
                        </div>
                        <div className="">
                            <WeeklyItems />
                        </div>
                    </main>

                    <aside className="hidden min-[1080px]:block w-80 flex-shrink-0 sticky top-0 self-start h-100">
                        <div className="flex flex-col gap-6">
                            <GitCalendarContainer />
                            <MonthlyCalendarContainer />
                        </div>
                    </aside>
                </div>
            </div >
        </div >
    );
};

export default DashboardPage;