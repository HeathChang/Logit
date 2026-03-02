import { useGithubActivity } from "./useGithubActivity";

export const useGitCalendar = () => {
    const { startDate, endDate, calendarValues: values } = useGithubActivity();

    const handleMouseOver = (value: unknown) => {
        // TODO: 추후 툴팁 UI로 연결
        console.log(value);
    };

    const handleClickDate = (value: unknown) => {
        // TODO: 추후 상세 로그 모달 등 액션으로 교체
        console.log(value);
    };

    return {
        startDate,
        endDate,
        values,
        handleMouseOver,
        handleClickDate,
    };
};
