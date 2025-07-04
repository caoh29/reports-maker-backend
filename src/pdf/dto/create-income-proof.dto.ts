import { IsNotEmpty, IsString } from 'class-validator';
import { CreateBaseReportDto } from './base-report.dto';

export class CreateIncomeProofDto extends CreateBaseReportDto {
  @IsNotEmpty()
  @IsString()
  salary: string;
}
