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

export const getEmploymentLetterReport = (): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    styles: styles,
    pageMargins: [40, 60, 40, 60],

    header: getHeader(),

    content: [
      { text: 'EMPLOYMENT CERTIFICATE', style: 'title' },
      {
        text: `I, [Employer Name], in my capacity as [Employer Position] at [Company Name], hereby certify that [Employee Name] has been employed with our company since [Start Date of Employment].\n\n
        During their employment, Mr./Ms. [Employee Name] has held the position of [Employee Position], demonstrating responsibility, commitment, and professional skills in their duties.\n\n
        Mr./Ms. [Employee Name] works [Number of Hours] hours per day, following the schedule of [Work Schedule], and complies with the company’s policies and procedures.\n\n
        This certificate is issued at the request of the interested party for whatever purposes they deem necessary.\n\n`,
        style: 'body',
      },
      getSignature(),
    ],

    footer: getFooter('Employment Certificate'),
  };

  return docDefinition;
};
