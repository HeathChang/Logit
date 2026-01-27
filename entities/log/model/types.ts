
export const LOG_STATUS = {
  RECORD: 'RECORD',
  EMPTY: 'EMPTY',
} as const;


export type LogStatus = typeof LOG_STATUS[keyof typeof LOG_STATUS];

export interface Log {
  id: string;
  title: string;
  content: string;
  status: LogStatus;
  createdAt: string;
  updatedAt: string;
}