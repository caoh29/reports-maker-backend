import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PrinterModule } from './printer/printer.module';
import { SaveFileService } from './save-file/save-file.service';
import { SaveFileModule } from './save-file/save-file.module';
import { PdfModule } from './pdf/pdf.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmployeeModule,
    PrismaModule,
    PrinterModule,
    SaveFileModule,
    PdfModule,
  ],
  controllers: [],
  providers: [SaveFileService],
})
export class AppModule { }
