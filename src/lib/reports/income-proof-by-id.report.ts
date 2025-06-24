import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { getHeader, getSignature, getFooter } from './shared';
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

export const getIncomeProofReportById = (
  employee: EmployeeEntity,
  hrManager: EmployeeEntity,
): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    styles: styles,
    pageMargins: [40, 60, 40, 60],
    header: getHeader(),

    content: [
      { text: 'PROOF OF INCOME', style: 'title' },
      {
        text: `This is to certify that Mr./Ms. ${employee.name} receives an average monthly income of approximately $${employee.contract_type === 'SALARIED' ? employee.salary : employee.hourly_rate} USD ${employee.contract_type === 'SALARIED' ? 'annually' : 'per hour'} ${employee.contract_type === 'HOURLY' && employee.hours_per_day}, which includes base salary and bonuses, and other employment-related benefits.\n\n
        This certificate is issued at the request of the interested party for whatever purpose they deem necessary.\n\n`,
        style: 'body',
      },
      getSignature(hrManager),
    ],

    footer: getFooter('Salary Certificate'),
  };

  return docDefinition;
};
