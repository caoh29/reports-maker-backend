import { Content } from 'pdfmake/interfaces';
import { Sign } from '../../entities/pdf.entity';
import { COLOR_YELLOW_HEX } from 'src/lib/constants';
// import { EmployeeEntity } from 'src/employee/entities/employee.entity';

// export const getSignature = (signer?: EmployeeEntity): Content => {
export const getSignature = (signData?: Sign): Content => {
  const signature: Content = {
    stack: [
      {
        text: 'Regards,\n\n\n',
      },
      {
        text: '_______________________________',
        style: {
          bold: true,
        },
      },
      {
        text: signData?.signerName ?? '[Signer Name]',
        style: {
          bold: true,
          background: signData?.signerName ? undefined : COLOR_YELLOW_HEX,
        },
      },
      {
        text: signData?.signerRole ?? '[Signer Role]',
        style: {
          background: signData?.signerRole ? undefined : COLOR_YELLOW_HEX,
        },
      },
      {
        text: signData?.companyName ?? '[Company Name]',
        style: {
          background: signData?.companyName ? undefined : COLOR_YELLOW_HEX,
        },
      },
    ],
    alignment: 'left',
    margin: [0, 40, 0, 0],
  };

  return {
    columns: [signature],
  };
};
