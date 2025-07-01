import { Content } from 'pdfmake/interfaces';
import { Footer } from '../../entities/pdf.entity';

export const getFooter = (footerData?: Footer): Content => {
  const footerText: Content = {
    text: `This document is a ${footerData?.content.toLowerCase() ?? 'draft'} and does not represent a job offer.`,
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
