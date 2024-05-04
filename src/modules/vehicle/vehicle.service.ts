import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../service/database/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from '@prisma/client';

@Injectable()
export class VehicleService {
  constructor(
    private readonly database: PrismaService,
  ) { }

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    return await this.database.vehicle.create({
      data: createVehicleDto
    });
  }

  async save(id: string, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    return await this.database.vehicle.update({
      data: updateVehicleDto,
      where: { id }
    });
  }

  async find(id: string): Promise<Vehicle> {
    return await this.database.vehicle.findFirst({
      where: { id }
    });
  }

  async list(): Promise<Vehicle[]> {
    return await this.database.vehicle.findMany();
  }
}
