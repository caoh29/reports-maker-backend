// employee/helpers/employee.mapper.ts
import { EmployeeEntity } from '../entities/employee.entity';
import { Employee, Department, Benefit } from 'generated/prisma';

type PrismaEmployeeWithRelations = Employee & {
  department: Department;
  benefits: {
    benefit: Benefit;
  }[];
};

export function mapPrismaEmployeeToEntity(
  employee: PrismaEmployeeWithRelations,
): EmployeeEntity {
  return {
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
    benefits: employee.benefits.map((b) => b.benefit.name).join(', '),
  };
}
