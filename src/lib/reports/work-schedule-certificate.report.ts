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

export const getWorkScheduleCertificateReport = (): TDocumentDefinitions => {
  return {
    styles: styles,
    pageMargins: [40, 60, 40, 60],
    header: getHeader(),

    content: [
      { text: 'WORK SCHEDULE CERTIFICATE', style: 'title' },
      {
        text: `I, [Employer Name], in my role as [Employer Position] at [Company Name], hereby certify that Mr./Ms. [Employee Name] currently works [Weekly Hours] hours per week at [Company Name], with a schedule from [Work Schedule], Monday through Friday.\n\n
        This certificate is issued upon request.\n\n`,
        style: 'body',
      },
      getSignature(),
    ],

    footer: getFooter('Work Schedule Certificate'),
  };
};
