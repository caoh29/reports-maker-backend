import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import {
  getHeader,
  getSigner,
  getFooter,
  getDate,
  getSignature,
} from './shared';
import { CreateWorkScheduleCertificateDto } from '../dto/create-work-schedule-certificate.dto';
import { COLOR_YELLOW_HEX } from 'src/lib/constants';
export const getWorkScheduleCertificateReport = (
  options?: CreateWorkScheduleCertificateDto,
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
      // text: `I, [Employer Name], in my role as [Employer Position] at [Company Name], hereby certify that Mr./Ms. [Employee Name] currently works [Weekly Hours] hours per week at [Company Name], with a schedule from [Work Schedule], Monday through Friday.\n\n
      //   This certificate is issued upon request.\n\n`,
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
        ' currently works in the following schedule: ',
        {
          text: options?.workSchedule ?? '[Employee Work schedule]',
          style: {
            background: options?.workSchedule ? undefined : COLOR_YELLOW_HEX,
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
        ' department.\n\n',
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
    }),
    getSigner({
      signerName: options?.signerName,
      signerRole: options?.signerRole,
      companyName: options?.companyName,
    }),
  ],

  footer: getFooter(options?.footer),
});
