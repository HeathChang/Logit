/**
 * GitStatus의 런타임 값들을 정의합니다.
 */
export const GIT_STATUS = {
    COMMIT: 'COMMIT',
    EMPTY: 'EMPTY', // 커밋이 없는 상태
  } as const;
  
  /**
   * GIT_STATUS 객체의 가용 값들만 추출하여 타입으로 정의합니다.
   * 결과: 'COMMIT' | 'EMPTY'
   */
  export type GitStatus = typeof GIT_STATUS[keyof typeof GIT_STATUS];
  
  /**
   * Git 활동 엔티티 인터페이스
   * 주로 GitHub API에서 가져온 일일 활동 데이터를 담습니다.
   */
  export interface Git {
    id: string;          // 고유 식별자 (예: date 기반 '2026-01-25')
    date: string;        // YYYY-MM-DD 형식
    commitCount: number; // 해당 날짜의 총 커밋 수
    status: GitStatus;   // 'COMMIT' | 'EMPTY'
    
    // 어떤 레포지토리에서 활동했는지 기록하면 나중에 Weekly Trace가 풍성해집니다.
    // repositories?: string[]; 
  }