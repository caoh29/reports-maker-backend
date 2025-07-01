import { Content } from 'pdfmake/interfaces';
import { Header } from '../../entities/pdf.entity';
import { COLOR_YELLOW_HEX } from 'src/lib/constants';

export const getHeader = (headerData?: Header): Content => {
  const headerLogo: Content = {
    image: headerData?.logoUrl ?? 'src/assets/100x100.png',
    width: 100,
    height: 100,
    alignment: 'left',
  };

  const headerCompanyInfo: Content = {
    stack: [
      {
        text: headerData?.stamp?.companyName ?? '[Company Name]',
      },
      {
        text: headerData?.stamp?.companyAddress ?? '[Company Data]',
      },
    ],
    style: {
      bold: true,
      fontSize: 12,
      background: COLOR_YELLOW_HEX,
    },
    alignment: 'left',
    margin: [340, 0, 0, 0],
  };

  return {
    columns: [headerLogo, headerCompanyInfo],
    margin: [20, 20, 20, 50],
  };
};
