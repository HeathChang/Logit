"use client";

import { LogEditorContainer } from "@/features/dashboard/ui/LogEditor";
import { DailyMission } from "@/features/dashboard/ui/DailyMission";
import { WeeklyItemsContainer } from "@/features/dashboard/ui/WeeklyItems";
import { GitCalendarContainer } from "@/features/dashboard/ui/GitCalendar";
import { MonthlyCalendarContainer } from "@/features/dashboard/ui/MonthlyCalendar";


const DashboardPage = () => {

    return (
        <div className="min-h-screen bg-bg-main">
            <div className="w-full max-w-7xl mx-auto px-4 py-6">
                <div className="flex gap-6 justify-center">
                    <main className="min-w-[720px] flex flex-col">
                        <div className="">
                            <DailyMission />
                        </div>
                        <div className="mt-4">
                            <LogEditorContainer />
                        </div>
                        <div className="mt-4">
                            <WeeklyItemsContainer />
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