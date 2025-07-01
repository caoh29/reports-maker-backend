import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getHeader, getSignature, getFooter, getDate } from './shared';
import { CreatePdfDto } from '../dto/create-pdf.dto';
import { COLOR_YELLOW_HEX } from 'src/lib/constants';

export const getSalaryCertificateReport = (
  options?: CreatePdfDto,
): TDocumentDefinitions => ({
  pageMargins: [30, 60, 30, 60],
  pageSize: 'A4',

  header: getHeader(options?.header),

  content: [
    getDate(options?.body.date),
    {
      // text: `I, [Employer Name], in my role as [Employer Position] at [Company Name], hereby certify that Mr./Ms. [Employee Name], identified with [ID Type and Number], has been employed with us since [Start Date]. Currently, he/she holds the position of [Job Title] in the [Employee Department] department with a [Employee Contract Type] contract. Based on this type of contract the amount paid is $[Salary Amount] USD [annually/hourly], subject to legal deductions.\n\n
      //   This certificate is issued at the request of the employee.\n\n`,
      text: [
        'By this method we certified that ',
        {
          text: options?.body.employee.name ?? '[Employee Name]',
          style: {
            background: COLOR_YELLOW_HEX,
          },
        },
        ' identified with ',
        {
          text:
            options?.body.employee.documentType ?? '[Employee Document Type]',
          style: {
            background: COLOR_YELLOW_HEX,
          },
        },
        ' #',
        {
          text:
            options?.body.employee.documentNumber ??
            '[Employee Document Number]',
          style: {
            background: COLOR_YELLOW_HEX,
          },
        },
        ', has been employed with us since ',
        {
          text: options?.body.employee.startDate ?? '[Employee Start Date]',
          style: {
            background: COLOR_YELLOW_HEX,
          },
        },
        '. Currently, he/she holds the position of ',
        {
          text: options?.body.employee.role ?? '[Employee Role]',
          style: {
            background: COLOR_YELLOW_HEX,
          },
        },
        ' in the ',
        {
          text: options?.body.employee.department ?? '[Employee Department]',
          style: {
            background: COLOR_YELLOW_HEX,
          },
        },
        ' department with a ',
        {
          text:
            options?.body.employee.contractType?.toLowerCase() ??
            '[Employee Contract Type]',
          style: {
            background: COLOR_YELLOW_HEX,
          },
        },
        ' contract. Based on this type of contract the amount paid is $',
        {
          text: options?.body.employee.salary ?? '[Salary Amount]',
          style: {
            background: COLOR_YELLOW_HEX,
          },
        },
        ' USD ',
        {
          text:
            options?.body.employee.contractType?.toLowerCase() ??
            '[Employee Contract Type]',
          style: {
            background: COLOR_YELLOW_HEX,
          },
        },
        ', subject to legal deductions.\n\n',
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
