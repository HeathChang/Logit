import { useMemo, useState } from "react";

export type DayStatus = {
  date: Date;
  hasLog: boolean;
  hasGit: boolean;
};

export const useMonthlyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showLog, setShowLog] = useState(true);
  const [showGit, setShowGit] = useState(true);

    // 현재 달의 첫 날과 마지막 날 계산
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDay.getDay(); // 0 (일요일) ~ 6 (토요일)

    // 달력에 표시할 날짜들 생성 (현재 달의 날짜만)
  const calendarDays = useMemo(() => {
    const days: Date[] = [];

    // 현재 달의 날들만 추가
    for (let day = 1; day <= lastDay.getDate(); day += 1) {
      days.push(new Date(year, month, day));
    }

    return days;
  }, [year, month, lastDay]);

    // 각 날짜의 상태 (실제 데이터는 나중에 API로 가져올 예정)
  const dayStatuses = useMemo(() => {
    const statuses: Map<string, DayStatus> = new Map();

    // 임시 더미 데이터 (실제로는 API에서 가져올 것)
    // 현재 표시 중인 달의 날짜들로 생성
    const dummyData: { day: number; hasLog: boolean; hasGit: boolean }[] = [
      { day: 5, hasLog: true, hasGit: true },
      { day: 10, hasLog: false, hasGit: true },
      { day: 15, hasLog: true, hasGit: true },
      { day: 18, hasLog: false, hasGit: false },
      { day: 20, hasLog: true, hasGit: false },
    ];

    dummyData.forEach(({ day, hasLog, hasGit }) => {
      const date = new Date(year, month, day);
      const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      statuses.set(dateKey, {
        date,
        hasLog,
        hasGit,
      });
    });

    return statuses;
  }, [year, month]);

  const getDayStatus = (date: Date): DayStatus => {
    const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    return dayStatuses.get(dateKey) ?? { date, hasLog: false, hasGit: false };
  };

  const getDayIcon = (status: DayStatus): string => {
    const { hasLog, hasGit } = status;

    // 실제 데이터 상태에 따라 아이콘 결정
    if (hasLog && hasGit) {
      return "✓"; // 둘 다 작업함
    }
    if (hasLog || hasGit) {
      return "△"; // 하나만 작업함
    }
    return "✗"; // 둘 다 안함
  };

  const getDayColorClass = (status: DayStatus): string => {
    const { hasLog, hasGit } = status;

    // 토글 상태에 따라 투명도 조절
    const shouldShow =
      (showLog && hasLog) || (showGit && hasGit) || (!hasLog && !hasGit);
    const opacity = shouldShow ? "" : " opacity-30";

    // 실제 데이터 상태에 따라 색상 결정
    if (hasLog && hasGit) {
      return `text-status-success${opacity}`;
    }
    if (hasLog || hasGit) {
      return `text-status-warning${opacity}`;
    }
    return `text-status-danger${opacity}`;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const monthLabel = `${year}년 ${month + 1}월`;

  return {
    currentDate,
    monthLabel,
    calendarDays,
    firstDayOfWeek,
    showLog,
    showGit,
    setShowLog,
    setShowGit,
    getDayStatus,
    getDayIcon,
    getDayColorClass,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
  };
};

