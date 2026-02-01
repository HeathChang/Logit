'use client';
import ReactCalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import useGitCalendar from '../model/useGitCalendar';

const GitCalendar = () => {
    const { startDate, endDate, values, handleMouseOver, handleClickDate } = useGitCalendar();
    return (
        <section className="w-full rounded-xl bg-bg-card p-4 shadow-sm">
            <header className="mb-4">
                <h2 className="text-sm font-semibold text-text-main">
                    Git 활동 히스토리
                </h2>
                <p className="text-xs text-text-sub mt-1">
                    지난 30일간의 커밋 활동을 확인해보세요.
                </p>
            </header>
            <div className="overflow-x-auto">
                <ReactCalendarHeatmap
                    startDate={startDate}
                    endDate={endDate}
                    values={values}
                    onClick={handleClickDate}
                />
            </div>

        </section>
    );
};

export default GitCalendar;

