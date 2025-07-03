import { Content } from 'pdfmake/interfaces';
import { COLOR_YELLOW_HEX } from 'src/lib/constants';
// import { EmployeeEntity } from 'src/employee/entities/employee.entity';

// export const getSignature = (signer?: EmployeeEntity): Content => {

interface Props {
  signerName?: string;
  signerRole?: string;
  companyName?: string;
}

export const getSigner = ({
  signerName,
  signerRole,
  companyName,
}: Props): Content => {
  const signer: Content = {
    stack: [
      {
        text: '_______________________________',
        style: {
          bold: true,
        },
      },
      {
        text: signerName ?? '[Signer Name]',
        style: {
          bold: true,
          background: signerName ? undefined : COLOR_YELLOW_HEX,
        },
      },
      {
        text: signerRole ?? '[Signer Role]',
        style: {
          background: signerRole ? undefined : COLOR_YELLOW_HEX,
        },
      },
      {
        text: companyName ?? '[Company Name]',
        style: {
          background: companyName ? undefined : COLOR_YELLOW_HEX,
        },
      },
    ],
    alignment: 'left',
    margin: [0, 3, 0, 0],
  };

  return {
    columns: [signer],
  };
};
