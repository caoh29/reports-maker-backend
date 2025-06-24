import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ContractType } from '../../../generated/prisma';

export class CreateEmployeeDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty({ maxLength: 100 })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ maxLength: 50 })
  @IsString()
  @MaxLength(50)
  position: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  start_date: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  work_time: Date;

  @ApiProperty()
  @IsInt()
  hours_per_day: number;

  @ApiProperty({ maxLength: 50 })
  @IsString()
  @MaxLength(50)
  work_schedule: string;

  @ApiProperty()
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({ maxLength: 30 })
  @IsString()
  @MaxLength(30)
  document_type: string;

  @ApiProperty({ maxLength: 50 })
  @IsString()
  @MaxLength(50)
  document_number: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  created_at: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  updated_at: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  salary?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  hourly_rate?: number;

  @ApiProperty({ enum: ContractType, default: ContractType.SALARIED })
  @IsEnum(ContractType)
  contract_type: ContractType;

  @ApiProperty()
  @IsInt()
  department_id: number;

  // @ApiProperty({ type: () => DepartmentEntity })
  // department?: any; // Replace with `DepartmentEntity` class if defined

  // @ApiProperty({ type: () => [BenefitEntity] })
  // benefits?: any[]; // Replace with `BenefitEntity` class if defined
}
