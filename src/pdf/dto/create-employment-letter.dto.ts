import { IsNotEmpty, IsString } from 'class-validator';
import { CreateBaseReportDto } from './base-report.dto';

export class CreateEmploymentLetterDto extends CreateBaseReportDto {
  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  department: string;

  @IsNotEmpty()
  @IsString()
  startDate: string;
}
