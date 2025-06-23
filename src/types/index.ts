export const enum ReportType {
  EMPLOYMENT_LETTER = 'employment-letter',
}

export interface Employee {
  id: number;
  name: string;
  position: string;
  start_date: Date;
  work_time: Date;
  hours_per_day: number;
  work_schedule: string;
  is_active: boolean;
  document_type: string;
  document_number: string;
  salary: number | null;
  hourly_rate: number | null;
  contract_type: 'SALARIED' | 'HOURLY';
  created_at: Date;
  updated_at: Date;
  department: string;
  benefits: string;
}

export const COMPANY_NAME = 'Casas Inc';
