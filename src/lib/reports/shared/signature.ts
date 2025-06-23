import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from '../../helpers/date-formatter';
import { Employee, COMPANY_NAME } from '../../types';

export const getSignature = (signer?: Employee): Content => {
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
