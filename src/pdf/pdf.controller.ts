import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { PdfService } from './pdf.service';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { UpdatePdfDto } from './dto/update-pdf.dto';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) { }

  @Get('employment-letter')
  async getEmploymentLetter(@Res() response: Response) {
    const pdf = await this.pdfService.getEmploymentLetterTemplate();
    response.setHeader('Content-Type', 'application/pdf');
    pdf.pipe(response);
    pdf.end();
  }

  @Get('employment-letter/:id')
  async getEmploymentLetterById(
    @Res() response: Response,
    @Param('id') id: string,
  ) {
    const pdf = await this.pdfService.getEmploymentLetterByEmployeeId(id);
    response.setHeader('Content-Type', 'application/pdf');
    pdf.pipe(response);
    pdf.end();
  }

  @Get('salary-certificate')
  async getSalaryCertificate(@Res() response: Response) {
    const pdf = await this.pdfService.getSalaryCertificateTemplate();
    response.setHeader('Content-Type', 'application/pdf');
    pdf.pipe(response);
    pdf.end();
  }

  @Get('salary-certificate/:id')
  async getSalaryCertificateById(
    @Res() response: Response,
    @Param('id') id: string,
  ) {
    const pdf = await this.pdfService.getSalaryCertificateByEmployeeId(id);
    response.setHeader('Content-Type', 'application/pdf');
    pdf.pipe(response);
    pdf.end();
  }

  @Get('income-proof')
  async getIncomeProof(@Res() response: Response) {
    const pdf = await this.pdfService.getIncomeProofTemplate();
    response.setHeader('Content-Type', 'application/pdf');
    pdf.pipe(response);
    pdf.end();
  }

  @Get('income-proof/:id')
  async getIncomeProofById(@Res() response: Response, @Param('id') id: string) {
    const pdf = await this.pdfService.getIncomeProofByEmployeeId(id);
    response.setHeader('Content-Type', 'application/pdf');
    pdf.pipe(response);
    pdf.end();
  }

  @Get('work-schedule-certificate')
  async getWorkScheduleCertificate(@Res() response: Response) {
    const pdf = await this.pdfService.getWorkScheduleCertificateTemplate();
    response.setHeader('Content-Type', 'application/pdf');
    pdf.pipe(response);
    pdf.end();
  }

  @Get('work-schedule-certificate/:id')
  async getWorkScheduleCertificateById(
    @Res() response: Response,
    @Param('id') id: string,
  ) {
    const pdf = await this.pdfService.getWorkScheduleCertificateByEmployeeId(id);
    response.setHeader('Content-Type', 'application/pdf');
    pdf.pipe(response);
    pdf.end();
  }

  // @Post()
  // create(@Body() createPdfDto: CreatePdfDto) {
  //   return this.pdfService.create(createPdfDto);
  // }
  // @Get()
  // findAll() {
  //   return this.pdfService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.pdfService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePdfDto: UpdatePdfDto) {
  //   return this.pdfService.update(+id, updatePdfDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pdfService.remove(+id);
  // }
}
