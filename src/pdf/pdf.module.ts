import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { PrinterModule } from 'src/printer/printer.module';
import { SaveFileModule } from 'src/save-file/save-file.module';
import { ImageModule } from 'src/image/image.module';
// import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  controllers: [PdfController],
  providers: [PdfService],
  imports: [PrinterModule, SaveFileModule, ImageModule],
  // imports: [PrinterModule, SaveFileModule, EmployeeModule],
})
export class PdfModule { }
