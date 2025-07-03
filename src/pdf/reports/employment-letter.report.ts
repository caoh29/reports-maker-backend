import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import {
  getHeader,
  getSigner,
  getFooter,
  getDate,
  getSignature,
} from './shared';
import { CreateEmploymentLetterDto } from '../dto/create-employment-letter.dto';
import { COLOR_YELLOW_HEX } from 'src/lib/constants';
import { DateFormatter } from 'src/lib/helpers/date-formatter';

export const getEmploymentLetterReport = (
  options?: CreateEmploymentLetterDto,
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
      // text: `By this method we certified that ${options?.body.employee.name ?? '[Employee Name]'} has been employed with our company since [Start Date of Employment].\n\n
      //     During their employment, Mr./Ms. [Employee Name] has held the position of [Employee Position], demonstrating responsibility, commitment, and professional skills in their duties.\n\n
      //     Mr./Ms. [Employee Name] works [Number of Hours] hours per day, following the schedule of [Work Schedule], and complies with the company’s policies and procedures.\n\n
      //     This certificate is issued at the request of the interested party for whatever purposes they deem necessary.`,
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
        '.\n\n',
        'During their employment, Mr./Ms. ',
        {
          text: options?.employeeName ?? '[Employee Name]',
          style: {
            background: options?.employeeName ? undefined : COLOR_YELLOW_HEX,
          },
        },
        ' has held the position of ',
        {
          text: options?.role ?? '[Employee Role]',
          style: {
            background: options?.role ? undefined : COLOR_YELLOW_HEX,
          },
        },
        'in the ',
        {
          text: options?.department ?? '[Employee Department]',
          style: {
            background: options?.department ? undefined : COLOR_YELLOW_HEX,
          },
        },
        ' department, demonstrating responsibility, commitment, and professional skills in their duties.\n\n',
        'This certificate is issued at the request of the interested party for whatever purposes they deem necessary.\n\n\n\n',
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
