import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import {
  getHeader,
  getSigner,
  getFooter,
  getDate,
  getSignature,
} from './shared';
import { CreateSalaryCertificateDto } from '../dto/create-salary-certificate.dto';
import { COLOR_YELLOW_HEX } from 'src/lib/constants';
import { DateFormatter } from 'src/lib/helpers/date-formatter';

export const getSalaryCertificateReport = (
  options?: CreateSalaryCertificateDto,
  files?: {
    logo?: string[];
    signature?: string[];
  },
): TDocumentDefinitions => ({
  pageMargins: [30, 60, 30, 60],
  pageSize: 'A4',

  header: getHeader({
    companyName: options?.companyName,
    companyPhone: options?.companyPhone,
    logo: files?.logo,
  }),

  content: [
    getDate(options?.date),
    {
      // text: `I, [Employer Name], in my role as [Employer Position] at [Company Name], hereby certify that Mr./Ms. [Employee Name], identified with [ID Type and Number], has been employed with us since [Start Date]. Currently, he/she holds the position of [Job Title] in the [Employee Department] department with a [Employee Contract Type] contract. Based on this type of contract the amount paid is $[Salary Amount] USD [annually/hourly], subject to legal deductions.\n\n
      //   This certificate is issued at the request of the employee.\n\n`,
      text: [
        'By this method we certified that ',
        {
          text: options?.employeeName ?? '[Employee Name]',
          style: {
            background: options?.employeeName ? undefined : COLOR_YELLOW_HEX,
          },
        },
        ' identified with ',
        {
          text: options?.employeeIdType ?? '[Employee Document Type]',
          style: {
            background: options?.employeeIdType ? undefined : COLOR_YELLOW_HEX,
          },
        },
        ' #',
        {
          text: options?.employeeId ?? '[Employee Document Number]',
          style: {
            background: options?.employeeId ? undefined : COLOR_YELLOW_HEX,
          },
        },
        ' has been employed with our company since ',
        {
          text: options?.startDate
            ? DateFormatter.getDDMMYYYY(new Date(options.startDate))
            : '[Employee Start Date]',
          style: {
            background: options?.startDate ? undefined : COLOR_YELLOW_HEX,
          },
        },
        '. Currently, he/she holds the position of ',
        {
          text: options?.role ?? '[Employee Role]',
          style: {
            background: options?.role ? undefined : COLOR_YELLOW_HEX,
          },
        },
        ' in the ',
        {
          text: options?.department ?? '[Employee Department]',
          style: {
            background: options?.department ? undefined : COLOR_YELLOW_HEX,
          },
        },
        ' department with a ',
        {
          text:
            options?.contractType?.toLowerCase() ?? '[Employee Contract Type]',
          style: {
            background: options?.contractType ? undefined : COLOR_YELLOW_HEX,
          },
        },
        ' contract. Based on this type of contract the amount paid is $',
        {
          text: options?.salary ?? '[Salary Amount]',
          style: {
            background: options?.salary ? undefined : COLOR_YELLOW_HEX,
          },
        },
        ' USD ',
        {
          text:
            options?.contractType?.toLowerCase() ?? '[Employee Contract Type]',
          style: {
            background: options?.contractType ? undefined : COLOR_YELLOW_HEX,
          },
        },
        ', subject to legal deductions.\n\n',
        'This certificate is issued at the request of the interested party for whatever purpose they deem necessary.\n\n\n\n',
        'Regards,\n\n\n\n',
      ],
      style: {
        alignment: 'justify',
        margin: [0, 10, 0, 10],
      },
    },
    getSignature({
      signature: files?.signature,
      signerName: options?.signerName,
    }),
    getSigner({
      signerName: options?.signerName,
      signerRole: options?.signerRole,
      companyName: options?.companyName,
    }),
  ],

  footer: getFooter(options?.footer),
});
