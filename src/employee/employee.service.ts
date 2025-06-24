import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Employee } from 'src/lib/types';

@Injectable()
export class EmployeeService {
  constructor(private readonly prismaService: PrismaService) { }
  async create(createEmployeeDto: CreateEmployeeDto) {
    // return await this.prismaService.employee.create({
    //   data: createEmployeeDto,
    // });
  }

  async findAll() {
    return await this.prismaService.employee.findMany();
  }

  async findOne(id: number) {
    const employeeId = id;

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

  async findHrManager() {
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

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return await this.prismaService.employee.update({
      where: {
        id,
      },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.employee.delete({
      where: {
        id,
      },
    });
  }
}
