// employee/entities/employee.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { ContractType } from 'generated/prisma';

export class EmployeeEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  position: string;

  @ApiProperty()
  start_date: Date;

  @ApiProperty()
  work_time: Date;

  @ApiProperty()
  hours_per_day: number;

  @ApiProperty()
  work_schedule: string;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty()
  document_type: string;

  @ApiProperty()
  document_number: string;

  @ApiProperty({ required: false })
  salary: number | null;

  @ApiProperty({ required: false })
  hourly_rate: number | null;

  @ApiProperty({ enum: ContractType })
  contract_type: ContractType;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  department: string;

  @ApiProperty()
  benefits: string;
}
