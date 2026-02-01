import { SyntheticEvent } from "react";

const useGitCalendar = () => {

    const startDate = new Date();
    const endDate = new Date();
    startDate.setMonth(endDate.getMonth() - 3);

    const handleMouseOver = (value: any) => {
        console.log(value);
    }

    const handleClickDate = (value: any) => {
        console.log(value);
    }

    const values = [
        { date: '2026-01-15', count: 5 },
        { date: '2026-01-20', count: 12 },
        { date: '2026-01-10', count: 8 },
        { date: '2026-01-05', count: 15 },
        { date: '2026-01-18', count: 3 },
        { date: '2026-01-22', count: 20 },
        { date: '2026-01-30', count: 7 },
        { date: '2026-01-12', count: 11 },
        { date: '2026-01-25', count: 9 },
        { date: '2026-11-08', count: 14 },
        { date: '2026-11-19', count: 6 },
        { date: '2026-11-03', count: 18 },
    ];

    return {
        startDate,
        endDate,
        values,
        handleMouseOver,
        handleClickDate
    };
};

export default useGitCalendar;