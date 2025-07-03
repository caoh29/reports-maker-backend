import { Content } from 'pdfmake/interfaces';

export const getFooter = (footerData?: string): Content => {
  const footerText: Content = {
    text:
      footerData && footerData.length > 0
        ? footerData
        : `This document is a draft and does not represent a job offer.`,
    alignment: 'center',
    italics: true,
    margin: [0, 0, 0, 20],
    fontSize: 10,
    color: 'gray',
  };

  return {
    columns: [footerText],
  };
};
