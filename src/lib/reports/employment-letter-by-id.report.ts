import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { getHeader, getSignature, getFooter } from './shared';
import { COMPANY_NAME, Employee } from 'src/lib/types';
import { DateFormatter } from 'src/lib/helpers/date-formatter';

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

export const getEmploymentLetterReportById = (
  employee: Employee,
  hrManager: Employee,
): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    styles: styles,
    pageMargins: [40, 60, 40, 60],

    header: getHeader(),

    content: [
      { text: 'EMPLOYMENT CERTIFICATE', style: 'title' },
      {
        text: `I, ${hrManager.name}, in my capacity as ${hrManager.position} at ${COMPANY_NAME}, hereby certify that ${employee.name} identified with ${employee.document_type} #${employee.document_number} has been employed with our company since ${DateFormatter.getDDMMYYYY(employee.start_date)}. \n\n
        During their employment, Mr./Ms. ${employee.name} has held the position of ${employee.position}, demonstrating responsibility, commitment, and professional skills in their duties.\n\n
        Mr./Ms. ${employee.name} works ${employee.hours_per_day} hours per day, following the schedule of ${employee.work_schedule}, and complies with the company’s policies and procedures.\n\n
        This certificate is issued at the request of the interested party for whatever purposes they deem necessary. \n\n`,
        style: 'body',
      },
      getSignature(hrManager),
    ],

    footer: getFooter('Employment Certificate'),
  };

  return docDefinition;
};
