// import { Options } from 'src/lib/reports/types';

// export class CreatePdfDto implements Options { }
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Body, Header, Sign, Footer } from '../entities/pdf.entity';

export class CreatePdfDto {
  @ValidateNested()
  header: Header;

  @IsNotEmpty()
  @ValidateNested()
  body: Body;

  @IsNotEmpty()
  @ValidateNested()
  sign: Sign;

  @ValidateNested()
  footer: Footer;
}
