import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { getHeader } from './header';
import { getFooter } from './footer';

const styles: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 60, 0, 20],
  },
  body: {
    alignment: 'justify',
    margin: [0, 0, 0, 70],
  },
  signature: {
    fontSize: 14,
    bold: true,
  },
};

export const getSalaryCertificateReport = (): TDocumentDefinitions => {
  return {
    styles: styles,
    pageMargins: [40, 60, 40, 60],
    header: getHeader(),

    content: [
      { text: 'SALARY CERTIFICATE', style: 'header' },
      {
        text: `I, [Employer Name], in my role as [Employer Position] at [Company Name], hereby certify that Mr./Ms. [Employee Name], identified with [ID Type and Number], has been employed with us since [Start Date]. Currently, he/she holds the position of [Job Title] in the [Employee Department] department with a [Employee Contract Type] contract. Based on this type of contract the amount paid is $[Salary Amount] USD [annually/hourly], subject to legal deductions.\n\n
        This certificate is issued at the request of the employee.\n\n`,
        style: 'body',
      },
      { text: 'Sincerely', style: 'signature' },
      { text: '[Employer Name]', style: 'signature' },
      { text: '[Employer Position]', style: 'signature' },
      { text: '[Company Name]', style: 'signature' },
      { text: '[Date of Issue]', style: 'signature' },
    ],

    footer: getFooter('Salary Certificate'),
  };
};
