import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from '../../helpers/date-formatter';

export const getHeader = (): Content => {
  const headerLogo: Content = {
    image: 'src/assets/doggies.jpg',
    width: 100,
    height: 100,
    alignment: 'center',
    margin: [0, 0, 0, 20],
  };

  const headerDate: Content = {
    text: DateFormatter.getDDMMYYYY(new Date()),
    alignment: 'right',
    margin: [20, 20],
  };

  return {
    columns: [headerLogo, headerDate],
  };
};
