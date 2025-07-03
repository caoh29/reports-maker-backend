import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateBaseReportDto } from './base-report.dto';

export class CreateIncomeProofDto extends CreateBaseReportDto {
  @IsNotEmpty()
  @IsNumber()
  salary: number;
}
