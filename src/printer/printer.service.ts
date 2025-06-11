import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import type { TDocumentDefinitions, TFontDictionary } from 'pdfmake/interfaces';

const FONTS: TFontDictionary = {
  // NotoSans: {
  //   normal: 'fonts/NotoSans-Regular.ttf',
  // },
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Bold.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
  },
};

@Injectable()
export class PrinterService {
  private readonly printer = new PdfPrinter(FONTS);
  generatePdf(documentDefinition: TDocumentDefinitions) {
    if (!documentDefinition) {
      throw new Error('Document definition must be provided');
    }
    return this.printer.createPdfKitDocument(documentDefinition);
  }
}
