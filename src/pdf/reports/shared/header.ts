import { Content } from 'pdfmake/interfaces';
import { COLOR_YELLOW_HEX } from 'src/lib/constants';

interface Props {
  companyName?: string;
  companyPhone?: string;
  logo?: string[];
}

export const getHeader = ({
  companyName,
  companyPhone,
  logo,
}: Props): Content => {
  // If logo is not provided, use a default image
  const headerLogoImage =
    logo && logo.length > 0 ? logo[0] : 'src/assets/100x100.png';

  const headerLogo: Content = {
    image: headerLogoImage,
    width: 100,
    height: 100,
    alignment: 'left',
  };

  const headerCompanyInfo: Content = {
    stack: [
      {
        text: companyName ?? '[Company Name]',
      },
      {
        text: companyPhone ?? '[Company Phone]',
      },
    ],
    style: {
      bold: true,
      fontSize: 12,
      background: companyName && companyPhone ? undefined : COLOR_YELLOW_HEX,
    },
    alignment: 'left',
    margin: [340, 0, 0, 0],
  };

  return {
    columns: [headerLogo, headerCompanyInfo],
    margin: [20, 20, 20, 50],
  };
};
