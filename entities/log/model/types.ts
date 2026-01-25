
export const LOG_STATUS = {
    RECORD: 'RECORD',
    EMPTY: 'EMPTY',
  } as const;
  
  /**
   * LOG_STATUS 객체의 가용 값들만 추출하여 타입으로 정의합니다.
   * 결과: 'RECORD' | 'EMPTY'
   */
  export type LogStatus = typeof LOG_STATUS[keyof typeof LOG_STATUS];
  
  export interface Log {
    id: string;  
    title: string; 
    content: string; 
    status: LogStatus; 
    createdAt: string;
    updatedAt: string; 
  }