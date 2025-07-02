import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getHeader, getSignature, getFooter, getDate } from './shared';
import { CreatePdfDto } from '../dto/create-pdf.dto';
import { COLOR_YELLOW_HEX } from 'src/lib/constants';

export const getIncomeProofReport = (
  options?: CreatePdfDto,
): TDocumentDefinitions => ({
  pageMargins: [30, 60, 30, 60],
  pageSize: 'A4',

  header: getHeader(options?.header),

  content: [
    getDate(options?.body.date),
    {
      // text: `This is to certify that Mr./Ms. [Employee Name] receives an average monthly income of approximately [Total Amount] USD, which includes base salary and bonuses, and other employment-related benefits.\n\n
      //   This certificate is issued at the request of the interested party for whatever purpose they deem necessary.\n\n`,
      text: [
        'By this method we certified that ',
        {
          text: options?.body.employee.name ?? '[Employee Name]',
          style: {
            background: options?.body.employee.name
              ? undefined
              : COLOR_YELLOW_HEX,
          },
        },
        ' identified with ',
        {
          text:
            options?.body.employee.documentType ?? '[Employee Document Type]',
          style: {
            background: options?.body.employee.documentType
              ? undefined
              : COLOR_YELLOW_HEX,
          },
        },
        ' #',
        {
          text:
            options?.body.employee.documentNumber ??
            '[Employee Document Number]',
          style: {
            background: options?.body.employee.documentNumber
              ? undefined
              : COLOR_YELLOW_HEX,
          },
        },
        ' receives an annual income of approximately $',
        {
          text: options?.body.employee.salary ?? '[Employee Start Date]',
          style: {
            background: options?.body.employee.salary
              ? undefined
              : COLOR_YELLOW_HEX,
          },
        },
        ' USD, which includes base salary and bonuses, and other employment-related benefits.\n\n',
        'This certificate is issued at the request of the interested party for whatever purpose they deem necessary.\n\n',
      ],
      style: {
        alignment: 'justify',
        margin: [0, 10, 0, 10],
      },
    },
    getSignature(options?.sign),
  ],

  footer: getFooter(options?.footer),
});
