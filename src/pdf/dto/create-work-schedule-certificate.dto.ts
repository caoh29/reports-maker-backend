import { IsNotEmpty, IsString } from 'class-validator';
import { CreateBaseReportDto } from './base-report.dto';

export class CreateWorkScheduleCertificateDto extends CreateBaseReportDto {
  @IsNotEmpty()
  @IsString()
  workSchedule: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  department: string;
}
