import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { PrinterModule } from 'src/printer/printer.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SaveFileModule } from 'src/save-file/save-file.module';

@Module({
  controllers: [PdfController],
  providers: [PdfService],
  imports: [PrinterModule, PrismaModule, SaveFileModule],
})
export class PdfModule {}
