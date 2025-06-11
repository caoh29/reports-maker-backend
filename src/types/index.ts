export const enum ReportType {
  EMPLOYMENT_LETTER = 'employment-letter',
  EMPLOYMENT_CERTIFICATE = 'employment-certificate',
  EMPLOYMENT_VERIFICATION = 'employment-verification',
}

export interface Employee {
  id: number;
  name: string;
  position: string;
  start_date: Date;
  work_time: Date;
  hours_per_day: number;
  work_schedule: string;
}
