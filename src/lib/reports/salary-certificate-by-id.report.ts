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

export const getSalaryCertificateReportById = (
  employee: Employee,
  hrManager: Employee,
): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    styles: styles,
    pageMargins: [40, 60, 40, 60],
    header: getHeader(),

    content: [
      { text: 'SALARY CERTIFICATE', style: 'title' },
      {
        text: `I, ${hrManager.name}, in my role as ${hrManager.position} at ${COMPANY_NAME}, hereby certify that Mr./Ms. ${employee.name}, identified with ${employee.document_type} #${employee.document_number}, has been employed with us since ${DateFormatter.getDDMMYYYY(employee.start_date)}. Currently, he/she holds the position of ${employee.position} in the ${employee.department} department with a ${employee.contract_type.toLowerCase()} contract. Based on this type of contract the amount paid is $${employee.contract_type === 'SALARIED' ? employee.salary : employee.hourly_rate} USD ${employee.contract_type === 'SALARIED' ? 'annually' : 'hourly'}, subject to legal deductions.\n\n
        This certificate is issued at the request of the employee.\n\n`,
        style: 'body',
      },
      getSignature(hrManager),
    ],

    footer: getFooter('Salary Certificate'),
  };

  return docDefinition;
};
