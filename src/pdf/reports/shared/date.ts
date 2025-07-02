import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/lib/helpers/date-formatter';
import { COLOR_YELLOW_HEX } from 'src/lib/constants';

export const getDate = (date?: Date): Content => {
  const dateContent: Content = {
    text: date ? DateFormatter.getDDMMYYYY(date) : '[Date]',
    alignment: 'left',
    margin: [0, 150, 0, 40],
    background: date ? undefined : COLOR_YELLOW_HEX,
  };

  return {
    columns: [dateContent],
  };
};
