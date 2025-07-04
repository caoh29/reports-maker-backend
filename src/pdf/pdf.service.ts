import { Injectable } from '@nestjs/common';
// import { CreatePdfDto } from './dto/create-pdf.dto';
// import { UpdatePdfDto } from './dto/update-pdf.dto';
import { PrinterService } from 'src/printer/printer.service';
import { SaveFileService } from 'src/save-file/save-file.service';
// import { EmployeeService } from 'src/employee/employee.service';
import {
  getEmploymentLetterReport,
  // getEmploymentLetterReportById,
  getSalaryCertificateReport,
  // getSalaryCertificateReportById,
  getIncomeProofReport,
  // getIncomeProofReportById,
  getWorkScheduleCertificateReport,
  // getWorkScheduleCertificateReportById,
} from './reports';
import { ImageService } from 'src/image/image.service';
import { CreateEmploymentLetterDto } from './dto/create-employment-letter.dto';
import { CreateIncomeProofDto } from './dto/create-income-proof.dto';
import { CreateSalaryCertificateDto } from './dto/create-salary-certificate.dto';
import { CreateWorkScheduleCertificateDto } from './dto/create-work-schedule-certificate.dto';
import { REPORTS } from 'src/lib/constants';
// import { DateFormatter } from 'src/lib/helpers/date-formatter';

@Injectable()
export class PdfService {
  constructor(
    private readonly printerService: PrinterService,
    private readonly saveFileService: SaveFileService,
    private readonly imageService: ImageService,
    // private readonly employeeService: EmployeeService,
  ) { }

  async getReports() {
    const reports = await Promise.resolve(REPORTS);
    return reports;
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

  async getIncomeProofTemplate() {
    const pdf = this.printerService.generatePdf(getIncomeProofReport());
    await this.saveFileService.saveFile(
      'income-proof-template.pdf',
      pdf.toString(),
    );
    pdf.info.Title = 'income-proof-template';
    return pdf;
  }

  async getWorkScheduleCertificateTemplate() {
    const pdf = this.printerService.generatePdf(
      getWorkScheduleCertificateReport(),
    );
    await this.saveFileService.saveFile(
      'work-schedule-certificate-template.pdf',
      pdf.toString(),
    );
    pdf.info.Title = 'work-schedule-certificate-template';
    return pdf;
  }

  async createEmploymentLetter(
    createPdfDto: CreateEmploymentLetterDto,
    files: {
      logo?: Express.Multer.File[];
      signature?: Express.Multer.File[];
    },
  ) {
    const savedImages = await this.imageService.saveImages(files);
    const pdf = this.printerService.generatePdf(
      getEmploymentLetterReport(createPdfDto, savedImages),
    );
    await this.imageService.deleteImages(files);
    await this.saveFileService.saveFile(
      `employment-letter-${createPdfDto.employeeName}.pdf`,
      pdf.toString(),
    );
    pdf.info.Title = `employment-letter-${createPdfDto.employeeName}`;
    return pdf;
  }

  async createIncomeProof(
    createPdfDto: CreateIncomeProofDto,
    files: {
      logo?: Express.Multer.File[];
      signature?: Express.Multer.File[];
    },
  ) {
    const savedImages = await this.imageService.saveImages(files);
    const pdf = this.printerService.generatePdf(
      getIncomeProofReport(createPdfDto, savedImages),
    );
    await this.imageService.deleteImages(files);
    await this.saveFileService.saveFile(
      `income-proof-${createPdfDto.employeeName}.pdf`,
      pdf.toString(),
    );
    pdf.info.Title = `income-proof-${createPdfDto.employeeName}`;
    return pdf;
  }

  async createSalaryCertificate(
    createPdfDto: CreateSalaryCertificateDto,
    files: {
      logo?: Express.Multer.File[];
      signature?: Express.Multer.File[];
    },
  ) {
    const savedImages = await this.imageService.saveImages(files);
    const pdf = this.printerService.generatePdf(
      getSalaryCertificateReport(createPdfDto, savedImages),
    );
    await this.imageService.deleteImages(files);
    await this.saveFileService.saveFile(
      `salary-certificate-${createPdfDto.employeeName}.pdf`,
      pdf.toString(),
    );
    pdf.info.Title = `salary-certificate-${createPdfDto.employeeName}`;
    return pdf;
  }

  async createWorkScheduleCertificate(
    createPdfDto: CreateWorkScheduleCertificateDto,
    files: {
      logo?: Express.Multer.File[];
      signature?: Express.Multer.File[];
    },
  ) {
    const savedImages = await this.imageService.saveImages(files);
    const pdf = this.printerService.generatePdf(
      getWorkScheduleCertificateReport(createPdfDto, savedImages),
    );
    await this.imageService.deleteImages(files);
    await this.saveFileService.saveFile(
      `work-schedule-certificate-${createPdfDto.employeeName}.pdf`,
      pdf.toString(),
    );
    pdf.info.Title = `work-schedule-certificate-${createPdfDto.employeeName}`;
    return pdf;
  }

  // async getEmploymentLetterByEmployeeId(id: string) {
  //   // const employee = await this.employeeService.findOne(+id);
  //   // const hrManager = await this.employeeService.findHrManager();
  //   const [employee, hrManager] = await Promise.all([
  //     this.employeeService.findOne(+id),
  //     this.employeeService.findHrManager(),
  //   ]);

  //   const pdf = this.printerService.generatePdf(
  //     getEmploymentLetterReportById(employee, hrManager),
  //   );

  //   await this.saveFileService.saveFile(
  //     `employment-letter-${employee.id}-${DateFormatter.getDDMMYYYY(new Date())}.pdf`,
  //     pdf.toString(),
  //   );

  //   pdf.info.Title = `employment-letter-${employee.id}-${DateFormatter.getDDMMYYYY(new Date())}`;
  //   return pdf;
  // }

  // async getSalaryCertificateByEmployeeId(id: string) {
  //   // const employee = await this.employeeService.findOne(+id);
  //   // const hrManager = await this.employeeService.findHrManager();
  //   const [employee, hrManager] = await Promise.all([
  //     this.employeeService.findOne(+id),
  //     this.employeeService.findHrManager(),
  //   ]);

  //   const pdf = this.printerService.generatePdf(
  //     getSalaryCertificateReportById(employee, hrManager),
  //   );

  //   await this.saveFileService.saveFile(
  //     `salary-certificate-${employee.id}-${DateFormatter.getDDMMYYYY(new Date())}.pdf`,
  //     pdf.toString(),
  //   );

  //   pdf.info.Title = `salary-certificate-${employee.id}-${DateFormatter.getDDMMYYYY(new Date())}`;
  //   return pdf;
  // }

  // async getIncomeProofByEmployeeId(id: string) {
  //   // const employee = await this.employeeService.findOne(+id);
  //   // const hrManager = await this.employeeService.findHrManager();
  //   const [employee, hrManager] = await Promise.all([
  //     this.employeeService.findOne(+id),
  //     this.employeeService.findHrManager(),
  //   ]);

  //   const pdf = this.printerService.generatePdf(
  //     getIncomeProofReportById(employee, hrManager),
  //   );

  //   await this.saveFileService.saveFile(
  //     `income-proof-${employee.id}-${DateFormatter.getDDMMYYYY(new Date())}.pdf`,
  //     pdf.toString(),
  //   );

  //   pdf.info.Title = `income-proof-${employee.id}-${DateFormatter.getDDMMYYYY(new Date())}`;
  //   return pdf;
  // }

  // async getWorkScheduleCertificateByEmployeeId(id: string) {
  //   // const employee = await this.employeeService.findOne(+id);
  //   // const hrManager = await this.employeeService.findHrManager();
  //   const [employee, hrManager] = await Promise.all([
  //     this.employeeService.findOne(+id),
  //     this.employeeService.findHrManager(),
  //   ]);

  //   const pdf = this.printerService.generatePdf(
  //     getWorkScheduleCertificateReportById(employee, hrManager),
  //   );

  //   await this.saveFileService.saveFile(
  //     `work-schedule-certificate-${employee.id}-${DateFormatter.getDDMMYYYY(new Date())}.pdf`,
  //     pdf.toString(),
  //   );

  //   pdf.info.Title = `work-schedule-certificate-${employee.id}-${DateFormatter.getDDMMYYYY(new Date())}`;
  //   return pdf;
  // }


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
