import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { getHeader, getSignature, getFooter } from './shared';

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

export const getIncomeProofReport = (): TDocumentDefinitions => {
  return {
    styles: styles,
    pageMargins: [40, 60, 40, 60],
    header: getHeader(),

    content: [
      { text: 'PROOF OF INCOME', style: 'title' },
      {
        text: `This is to certify that Mr./Ms. [Employee Name] receives an average monthly income of approximately [Total Amount] USD, which includes base salary and bonuses, and other employment-related benefits.\n\n
        This certificate is issued at the request of the interested party for whatever purpose they deem necessary.\n\n`,
        style: 'body',
      },
      getSignature(),
    ],

    footer: getFooter('Proof of Income'),
  };
};
