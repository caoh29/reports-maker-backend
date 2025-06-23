import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { getHeader, getSignature, getFooter } from './shared';

const styles: StyleDictionary = {
  title: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 60, 0, 20],
  },
  body: {
    alignment: 'justify',
    margin: [0, 0, 0, 70],
  },
};

export const getSalaryCertificateReport = (): TDocumentDefinitions => {
  return {
    styles: styles,
    pageMargins: [40, 60, 40, 60],
    header: getHeader(),

    content: [
      { text: 'SALARY CERTIFICATE', style: 'title' },
      {
        text: `I, [Employer Name], in my role as [Employer Position] at [Company Name], hereby certify that Mr./Ms. [Employee Name], identified with [ID Type and Number], has been employed with us since [Start Date]. Currently, he/she holds the position of [Job Title] in the [Employee Department] department with a [Employee Contract Type] contract. Based on this type of contract the amount paid is $[Salary Amount] USD [annually/hourly], subject to legal deductions.\n\n
        This certificate is issued at the request of the employee.\n\n`,
        style: 'body',
      },
      getSignature(),
    ],

    footer: getFooter('Salary Certificate'),
  };
};
