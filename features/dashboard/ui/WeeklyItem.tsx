type WeeklyItemProps = {
    /** 예: "01.29 Wed" */
    dateLabel: string;
    /** 로그 제목 또는 첫 줄. 없으면 "기록 없음" 표시 */
    logTitle?: string | null;
    /** 해당 날짜의 커밋 개수 */
    commitCount: number;
};

const WeeklyItem = ({
    dateLabel,
    logTitle,
    commitCount,
}: WeeklyItemProps) => {
    const hasCommit = commitCount > 0;
    const hasLog = logTitle != null && logTitle.trim().length > 0;

    const displayTitle = hasLog ? logTitle : "기록 없음";

    const statusLabel =
        hasLog && hasCommit
            ? "Success"
            : hasLog || hasCommit
                ? "Warning"
                : "Fail";

    const statusColorClass =
        hasLog && hasCommit
            ? "bg-status-success"
            : hasLog || hasCommit
                ? "bg-status-warning"
                : "bg-status-danger";

    return (
        <article className="flex items-center justify-between py-2">
            {/* 날짜 및 요일 */}
            <div className="min-w-[88px] text-xs font-medium text-text-sub">
                {dateLabel}
            </div>

            {/* 로그 요약 */}
            <div className="flex-1 px-3">
                <p
                    className={`truncate text-sm ${hasLog ? "text-text-main" : "text-text-sub italic"
                        }`}
                >
                    {displayTitle}
                </p>
            </div>

            {/* Git 활동 요약 */}
            <div className="w-[96px] text-right text-xs text-text-sub">
                {hasCommit ? `${commitCount} Commits` : "0 Commit"}
            </div>

            {/* 상태 신호등 */}
            <div className="ml-3 flex items-center gap-1.5 text-[10px]">
                <span
                    className={`inline-block h-2.5 w-2.5 rounded-full ${statusColorClass}`}
                />
                <span className="text-text-sub">{statusLabel}</span>
            </div>
        </article>
    );
};

export default WeeklyItem;

