export class Pdf { }

export class Header {
  logoUrl?: string;
  stamp?: {
    companyName: string;
    companyAddress: string;
  };
}

export class Body {
  date?: Date;
  employee: {
    name: string;
    documentType: string;
    documentNumber: string;
    role?: string;
    startDate?: string;
    workSchedule?: string;
    salary?: number;
    contractType?: 'HOURLY' | 'ANNUALLY';
    department?: string;
  };
}

export class Sign {
  signatureUrl?: string;
  signerName: string;
  signerRole: string;
  companyName: string;
}

export class Footer {
  content: string;
}

export class Options {
  header?: Header;
  body: Body;
  sign: Sign;
  footer?: Footer;
}
