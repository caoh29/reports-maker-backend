import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { UpdatePdfDto } from './dto/update-pdf.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrinterService } from 'src/printer/printer.service';
import { SaveFileService } from 'src/save-file/save-file.service';
import {
  getEmploymentLetterReport,
  getEmploymentLetterReportById,
} from 'src/reports';
import { DateFormatter } from 'src/helpers/date-formatter';

@Injectable()
export class PdfService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly printerService: PrinterService,
    private readonly saveFileService: SaveFileService,
  ) { }

  async getEmploymentLetterTemplate() {
    const pdf = this.printerService.generatePdf(getEmploymentLetterReport());
    await this.saveFileService.saveFile(
      'employment-letter-template.pdf',
      pdf.toString(),
    );
    pdf.info.Title = 'employment-letter-template';
    return pdf;
  }

  async getEmploymentLetterByEmployeeId(id: string) {
    const employeeId = parseInt(id, 10);

    if (!employeeId) throw new Error('Invalid employee ID');

    const employee = await this.prismaService.employees.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employee)
      throw new NotFoundException('No employee was found in Database');

    const hrManager = await this.prismaService.employees.findFirst({
      where: {
        position: 'HR Manager',
        is_active: true,
      },
    });

    if (!hrManager)
      throw new NotFoundException('No HR Manager was found in Database');

    const pdf = this.printerService.generatePdf(
      getEmploymentLetterReportById(employee, hrManager),
    );

    await this.saveFileService.saveFile(
      `employment-letter-${employee.id}-${DateFormatter.getDDMMYYYY(new Date())}.pdf`,
      pdf.toString(),
    );

    pdf.info.Title = `employment-letter-${employee.id}-${DateFormatter.getDDMMYYYY(new Date())}`;
    return pdf;
  }
  create(createPdfDto: CreatePdfDto) {
    return 'This action adds a new pdf';
  }

  findAll() {
    return `This action returns all pdf`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pdf`;
  }

  update(id: number, updatePdfDto: UpdatePdfDto) {
    return `This action updates a #${id} pdf`;
  }

  remove(id: number) {
    return `This action removes a #${id} pdf`;
  }
}
