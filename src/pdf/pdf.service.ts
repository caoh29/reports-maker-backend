import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { UpdatePdfDto } from './dto/update-pdf.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrinterService } from 'src/printer/printer.service';
import { SaveFileService } from 'src/save-file/save-file.service';
import {
  getEmploymentLetterReport,
  getEmploymentLetterReportById,
  getSalaryCertificateReport,
  getSalaryCertificateReportById,
} from 'src/reports';
import { DateFormatter } from 'src/helpers/date-formatter';
import { Employee } from 'src/types';

@Injectable()
export class PdfService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly printerService: PrinterService,
    private readonly saveFileService: SaveFileService,
  ) { }

  private async getHrManager() {
    const hrManager = await this.prismaService.employee.findFirst({
      where: {
        position: 'HR Manager',
        is_active: true,
      },
      include: {
        department: true,
        benefits: {
          include: {
            benefit: true,
          },
        },
      },
    });

    if (!hrManager)
      throw new NotFoundException('No HR Manager was found in Database');

    const mappedManager: Employee = {
      id: hrManager.id,
      name: hrManager.name,
      position: hrManager.position,
      start_date: hrManager.start_date,
      work_time: hrManager.work_time,
      hours_per_day: hrManager.hours_per_day,
      work_schedule: hrManager.work_schedule,
      is_active: hrManager.is_active,
      document_type: hrManager.document_type,
      document_number: hrManager.document_number,
      salary: hrManager.salary,
      hourly_rate: hrManager.hourly_rate,
      contract_type: hrManager.contract_type,
      created_at: hrManager.created_at,
      updated_at: hrManager.updated_at,
      department: hrManager.department.name,
      benefits: hrManager.benefits.map((el) => el.benefit.name).join(', '),
    };

    return mappedManager;
  }

  private async getEmployeeById(id: string) {
    const employeeId = parseInt(id, 10);

    if (!employeeId) throw new Error('Invalid employee ID');

    const employee = await this.prismaService.employee.findUnique({
      where: {
        id: employeeId,
      },
      include: {
        department: true,
        benefits: {
          include: {
            benefit: true,
          },
        },
      },
    });

    if (!employee)
      throw new NotFoundException('No employee was found in Database');

    const mappedEmployee: Employee = {
      id: employee.id,
      name: employee.name,
      position: employee.position,
      start_date: employee.start_date,
      work_time: employee.work_time,
      hours_per_day: employee.hours_per_day,
      work_schedule: employee.work_schedule,
      is_active: employee.is_active,
      document_type: employee.document_type,
      document_number: employee.document_number,
      salary: employee.salary,
      hourly_rate: employee.hourly_rate,
      contract_type: employee.contract_type,
      created_at: employee.created_at,
      updated_at: employee.updated_at,
      department: employee.department.name,
      benefits: employee.benefits.map((el) => el.benefit.name).join(', '),
    };

    return mappedEmployee;
  }

  async getEmploymentLetterTemplate() {
    const pdf = this.printerService.generatePdf(getEmploymentLetterReport());
    await this.saveFileService.saveFile(
      'employment-letter-template.pdf',
      pdf.toString(),
    );
    pdf.info.Title = 'employment-letter-template';
    return pdf;
  }

  async getSalaryCertificateTemplate() {
    const pdf = this.printerService.generatePdf(getSalaryCertificateReport());
    await this.saveFileService.saveFile(
      'salary-certificate-template.pdf',
      pdf.toString(),
    );
    pdf.info.Title = 'salary-certificate-template';
    return pdf;
  }

  async getEmploymentLetterByEmployeeId(id: string) {
    const employee = await this.getEmployeeById(id);
    const hrManager = await this.getHrManager();

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

  async getSalaryCertificateByEmployeeId(id: string) {
    const employee = await this.getEmployeeById(id);
    const hrManager = await this.getHrManager();

    const pdf = this.printerService.generatePdf(
      getSalaryCertificateReportById(employee, hrManager),
    );

    await this.saveFileService.saveFile(
      `salary-certificate-${employee.id}-${DateFormatter.getDDMMYYYY(new Date())}.pdf`,
      pdf.toString(),
    );

    pdf.info.Title = `salary-certificate-${employee.id}-${DateFormatter.getDDMMYYYY(new Date())}`;
    return pdf;
  }
  // create(createPdfDto: CreatePdfDto) {
  //   return 'This action adds a new pdf';
  // }

  // findAll() {
  //   return `This action returns all pdf`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} pdf`;
  // }

  // update(id: number, updatePdfDto: UpdatePdfDto) {
  //   return `This action updates a #${id} pdf`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} pdf`;
  // }
}
