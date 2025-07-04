import { IsNotEmpty, IsString } from 'class-validator';
import { CreateBaseReportDto } from './base-report.dto';

export class CreateSalaryCertificateDto extends CreateBaseReportDto {
  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  department: string;

  @IsNotEmpty()
  @IsString()
  contractType: string;

  @IsNotEmpty()
  @IsString()
  salary: string;
}
