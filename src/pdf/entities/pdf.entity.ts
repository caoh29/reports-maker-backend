import { Type } from 'class-transformer';

export class Pdf { }


export class Stamp {
  companyName: string;
  companyPhone: string;
}

export class Employee {
  name: string;
  documentType: string;
  documentNumber: string;
  role?: string;
  salary?: number;
  workSchedule?: string;
  department?: string;
  contractType?: 'HOURLY' | 'ANNUALLY';

  @Type(() => Date)
  startDate?: Date;
}

export class Sign {
  signerName: string;
  signerRole: string;
  companyName: string;
  signatureUrl?: string;
}

export class Header {
  @Type(() => Stamp)
  stamp: Stamp;

  logoUrl?: string;
}

export class Body {
  @Type(() => Employee)
  employee: Employee;

  @Type(() => Date)
  date?: Date;
}

export class Footer {
  content: string;
}

export class Options {
  @Type(() => Body)
  body: Body;

  @Type(() => Sign)
  sign: Sign;

  @Type(() => Header)
  header: Header;

  @Type(() => Footer)
  footer?: Footer;
}
