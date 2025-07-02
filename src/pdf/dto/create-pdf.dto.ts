import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Body, Header, Sign, Footer } from '../entities/pdf.entity';

export class CreatePdfDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Header)
  header: Header;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Body)
  body: Body;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Sign)
  sign: Sign;

  @ValidateNested()
  @Type(() => Footer)
  footer: Footer;
}
