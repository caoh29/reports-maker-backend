import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getHeader, getSignature, getFooter, getDate } from './shared';
import { CreatePdfDto } from '../dto/create-pdf.dto';
import { COLOR_YELLOW_HEX } from 'src/lib/constants';
import { DateFormatter } from 'src/lib/helpers/date-formatter';

export const getEmploymentLetterReport = (
  options?: CreatePdfDto,
): TDocumentDefinitions => ({
  pageMargins: [30, 60, 30, 60],
  pageSize: 'A4',

  header: getHeader(options?.header),

  content: [
    getDate(options?.body.date),
    {
      // text: `By this method we certified that ${options?.body.employee.name ?? '[Employee Name]'} has been employed with our company since [Start Date of Employment].\n\n
      //     During their employment, Mr./Ms. [Employee Name] has held the position of [Employee Position], demonstrating responsibility, commitment, and professional skills in their duties.\n\n
      //     Mr./Ms. [Employee Name] works [Number of Hours] hours per day, following the schedule of [Work Schedule], and complies with the company’s policies and procedures.\n\n
      //     This certificate is issued at the request of the interested party for whatever purposes they deem necessary.`,
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
        ' has been employed with our company since ',
        {
          text: options?.body.employee.startDate
            ? DateFormatter.getDDMMYYYY(options.body.employee.startDate)
            : '[Employee Start Date]',
          style: {
            background: options?.body.employee.startDate
              ? undefined
              : COLOR_YELLOW_HEX,
          },
        },
        '.\n\n',
        'During their employment, Mr./Ms. ',
        {
          text: options?.body.employee.name ?? '[Employee Name]',
          style: {
            background: options?.body.employee.name
              ? undefined
              : COLOR_YELLOW_HEX,
          },
        },
        ' has held the position of ',
        {
          text: options?.body.employee.role ?? '[Employee Role]',
          style: {
            background: options?.body.employee.role
              ? undefined
              : COLOR_YELLOW_HEX,
          },
        },
        ', demonstrating responsibility, commitment, and professional skills in their duties.\n\n',
        'This certificate is issued at the request of the interested party for whatever purposes they deem necessary.',
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
