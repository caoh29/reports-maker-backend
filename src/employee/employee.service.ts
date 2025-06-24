import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { mapPrismaEmployeeToEntity } from './helpers/employee.mapper';

@Injectable()
export class EmployeeService {
  constructor(private readonly prismaService: PrismaService) { }
  async create(createEmployeeDto: CreateEmployeeDto) {
    return await this.prismaService.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll() {
    const employees = await this.prismaService.employee.findMany({
      include: {
        department: true,
        benefits: {
          include: {
            benefit: true,
          },
        },
      },
    });
    return employees.map((employee) => mapPrismaEmployeeToEntity(employee));
  }

  async findOne(id: number) {
    if (!id) throw new Error('Invalid employee ID');

    const employee = await this.prismaService.employee.findUnique({
      where: {
        id,
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

    return mapPrismaEmployeeToEntity(employee);
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

    return mapPrismaEmployeeToEntity(hrManager);
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
