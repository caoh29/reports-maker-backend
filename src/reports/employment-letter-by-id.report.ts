import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { getHeader } from './header';
import { getFooter } from './footer';
import { Employee } from 'src/types';
import { DateFormatter } from 'src/helpers/date-formatter';

const COMPANY_NAME = 'Casas Inc';

const styles: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 60, 0, 20],
  },
  body: {
    alignment: 'justify',
    margin: [0, 0, 0, 70],
  },
  signature: {
    fontSize: 14,
    bold: true,
  },
};

export const getEmploymentLetterReportById = (
  employee: Employee,
  hrManager: Employee,
): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    styles: styles,
    pageMargins: [40, 60, 40, 60],

    header: getHeader(),

    content: [
      {
        text: 'CONSTANCIA DE EMPLEO',
        style: 'header',
      },
      {
        text: `Yo, ${hrManager.name}, en mi calidad de ${hrManager.position} de ${COMPANY_NAME}, por medio de la presente certifico que ${employee.name} ha sido empleado en nuestra empresa desde el ${DateFormatter.getDDMMYYYY(employee.start_date)}. \n\n
        Durante su empleo, el Sr./Sra. ${employee.name} ha desempeñado el cargo de ${employee.position}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.\n\n
        La jornada laboral del Sr./ Sra. ${employee.name} es de ${employee.hours_per_day} horas diarias, con un horario de ${employee.work_schedule}, cumpliendo con las políticas y procedimientos establecidos por la empresa.\n\n
        Esta constancia se expide a solicitud del interesado para los fines que considere conveniente. \n\n`,
        style: 'body',
      },
      { text: `Atentamente`, style: 'signature' },
      { text: `${hrManager.name} `, style: 'signature' },
      { text: `${hrManager.position}`, style: 'signature' },
      { text: `${COMPANY_NAME}`, style: 'signature' },
      { text: `${DateFormatter.getDDMMYYYY(new Date())}`, style: 'signature' },
    ],

    footer: getFooter('Constancia de Empleo'),
  };

  return docDefinition;
};
