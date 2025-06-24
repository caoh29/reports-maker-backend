import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { getHeader, getSignature, getFooter } from './shared';
import { COMPANY_NAME } from 'src/lib/constants';
import { EmployeeEntity } from 'src/employee/entities/employee.entity';

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

export const getWorkScheduleCertificateReportById = (
  employee: EmployeeEntity,
  hrManager: EmployeeEntity,
): TDocumentDefinitions => {
  return {
    styles: styles,
    pageMargins: [40, 60, 40, 60],
    header: getHeader(),

    content: [
      { text: 'WORK SCHEDULE CERTIFICATE', style: 'title' },
      {
        text: `I, ${hrManager.name}, in my role as ${hrManager.position} at ${COMPANY_NAME}, hereby certify that Mr./Ms. ${employee.name} currently works ${employee.hours_per_day} hours per day, with a schedule from ${employee.work_schedule}.\n\n
        This certificate is issued upon request.\n\n`,
        style: 'body',
      },
      getSignature(hrManager),
    ],

    footer: getFooter('Work Schedule Certificate'),
  };
};
