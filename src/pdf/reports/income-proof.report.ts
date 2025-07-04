import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import {
  getHeader,
  getSigner,
  getFooter,
  getDate,
  getSignature,
} from './shared';
import { CreateIncomeProofDto } from '../dto/create-income-proof.dto';
import { COLOR_YELLOW_HEX } from 'src/lib/constants';

export const getIncomeProofReport = (
  options?: CreateIncomeProofDto,
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
      // text: `This is to certify that Mr./Ms. [Employee Name] receives an average monthly income of approximately [Total Amount] USD, which includes base salary and bonuses, and other employment-related benefits.\n\n
      //   This certificate is issued at the request of the interested party for whatever purpose they deem necessary.\n\n`,
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
        ' receives an annual income of approximately $',
        {
          text: options?.salary ?? '[Employee Salary]',
          style: {
            background: options?.salary ? undefined : COLOR_YELLOW_HEX,
          },
        },
        ' USD, which includes base salary and bonuses, and other employment-related benefits.\n\n',
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
