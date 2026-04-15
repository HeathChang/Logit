import { useGithubActivity } from "./useGithubActivity";

export const useGitCalendar = () => {
  const { startDate, endDate, calendarValues: values } = useGithubActivity();

  // TODO: 추후 툴팁 UI로 연결
  const handleMouseOver = (_value: unknown) => {};

  // TODO: 추후 상세 로그 모달 등 액션으로 교체
  const handleClickDate = (_value: unknown) => {};

  return {
    startDate,
    endDate,
    values,
    handleMouseOver,
    handleClickDate,
  };
};
