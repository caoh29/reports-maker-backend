import { Content } from 'pdfmake/interfaces';

export const getFooter = (documentName: string): Content => {
  const footerText: Content = {
    text: `Este documento es una ${documentName} y no representa un compromiso laboral.`,
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
