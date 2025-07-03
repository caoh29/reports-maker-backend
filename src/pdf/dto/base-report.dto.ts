import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBaseReportDto {
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  companyPhone: string;

  @IsNotEmpty()
  @IsString()
  employeeName: string;

  @IsNotEmpty()
  @IsString()
  employeeIdType: string;

  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @IsNotEmpty()
  @IsString()
  signerName: string;

  @IsNotEmpty()
  @IsString()
  signerRole: string;

  @IsString()
  footer?: string;

  @IsNotEmpty()
  @Type(() => Date)
  date: Date = new Date();
}
