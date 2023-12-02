import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly _databaseService: DatabaseService){}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this._databaseService.employee.create({
      data: createEmployeeDto,
    })
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if(role){
      return this._databaseService.employee.findMany({
        where: {
          role,
        }
      })
    }

    return this._databaseService.employee.findMany()
  }

  async findOne(id: number) {
    return this._databaseService.employee.findUnique({
      where: {
        id,
      }
    })
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this._databaseService.employee.update({
      where:{
        id
      },
      data: updateEmployeeDto
    })
  }

  async remove(id: number) {
    return this._databaseService.employee.delete({
      where: {
        id,
      }
    })
  }
}
