type TraceItem = {
    /** 예: "01.29 Wed" */
    dateLabel: string;
    /** 로그 제목 또는 첫 줄. 없으면 "기록 없음" 표시 */
    logTitle?: string | null;
    /** 해당 날짜에 로그를 실제로 작성했는지 */
    hasLog: boolean;
    /** 해당 날짜의 커밋 개수 */
    commitCount: number;
};

type WeeklyItemsProps = {
    items?: TraceItem[];
};

const DEFAULT_WEEKLY_ITEMS: TraceItem[] = [
    {
        dateLabel: "01.27 Mon",
        logTitle: "오늘은 리팩토링을 마무리했다",
        hasLog: true,
        commitCount: 5,
    },
    {
        dateLabel: "01.28 Tue",
        logTitle: "테스트 코드 정리",
        hasLog: true,
        commitCount: 0,
    },
    {
        dateLabel: "01.29 Wed",
        logTitle: null,
        hasLog: false,
        commitCount: 3,
    },
    {
        dateLabel: "01.30 Thu",
        logTitle: null,
        hasLog: false,
        commitCount: 0,
    },
];

const WeeklyItems = ({ items = DEFAULT_WEEKLY_ITEMS }: WeeklyItemsProps) => {
    const hasItems = items.length > 0;

    return (
        <section className="w-full rounded-xl bg-bg-card p-4 shadow-sm">
            <header className="mb-3 flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-semibold text-text-main">
                        이번 주 흐름
                    </h2>
                    <p className="text-xs text-text-sub">
                        로그 · 커밋 기준으로 한 주의 리듬을 한눈에 봐요.
                    </p>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-text-sub">
                    <div className="flex items-center gap-1">
                        <span className="inline-block h-2 w-2 rounded-full bg-status-success" />
                        <span>Success</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="inline-block h-2 w-2 rounded-full bg-status-warning" />
                        <span>Warning</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="inline-block h-2 w-2 rounded-full bg-status-danger" />
                        <span>Fail</span>
                    </div>
                </div>
            </header>

            <div className="flex flex-col divide-y divide-border-main">
                {hasItems ? (
                    items.map((item) => {
                        const hasCommit = item.commitCount > 0;
                        const hasLog = item.hasLog;

                        const displayTitle =
                            hasLog && item.logTitle && item.logTitle.trim().length > 0
                                ? item.logTitle
                                : "기록 없음";

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
                            <article
                                key={item.dateLabel}
                                className="flex items-center justify-between py-2"
                            >
                                {/* 날짜 및 요일 */}
                                <div className="min-w-[88px] text-xs font-medium text-text-sub">
                                    {item.dateLabel}
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
                                    {hasCommit ? `${item.commitCount} Commits` : "0 Commit"}
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
                    })
                ) : (
                    <div className="py-4 text-center text-xs text-text-sub">
                        이번 주 기록이 아직 없어요. 오늘 한 일을 간단하게라도 남겨보는 건
                        어때요?
                    </div>
                )}
            </div>
        </section>
    );
};

export default WeeklyItems;

