import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrinterModule } from './printer/printer.module';
import { SaveFileService } from './save-file/save-file.service';
import { SaveFileModule } from './save-file/save-file.module';
import { PdfModule } from './pdf/pdf.module';
// import { PrismaModule } from './prisma/prisma.module';
// import { EmployeeModule } from './employee/employee.module';
import { ImageService } from './image/image.service';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // EmployeeModule,
    // PrismaModule,
    PrinterModule,
    SaveFileModule,
    PdfModule,
    ImageModule,
  ],
  controllers: [],
  providers: [SaveFileService, ImageService],
})
export class AppModule { }
