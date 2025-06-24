import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from '../../helpers/date-formatter';
import { COMPANY_NAME } from '../../constants';
import { EmployeeEntity } from 'src/employee/entities/employee.entity';

export const getSignature = (signer?: EmployeeEntity): Content => {
  const signature: Content = {
    text: `Sincerely,\n${signer ? signer.name : '[Employer Name]'}\n${signer ? signer.position : '[Employer Position]'}\n${signer ? COMPANY_NAME : '[Company Name]'}\n${signer ? DateFormatter.getDDMMYYYY(new Date()) : '[Date Issue]'}`,
    alignment: 'left',
    margin: [20, 20],
    fontSize: 14,
    bold: true,
  };

  return {
    columns: [signature],
  };
};
