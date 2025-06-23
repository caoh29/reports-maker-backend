import { Content } from 'pdfmake/interfaces';

export const getFooter = (documentName: string): Content => {
  const footerText: Content = {
    text: `This document is a ${documentName} and does not represent a job offer.`,
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
