import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../service/database/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle as VehiclePersistence } from '@prisma/client';

@Injectable()
export class VehicleService {
  constructor(
    private readonly database: PrismaService,
  ) { }

  async create(createVehicleDto: CreateVehicleDto): Promise<VehiclePersistence> {
    return await this.database.vehicle.create({
      data: createVehicleDto
    });
  }

  async save(id: string, updateVehicleDto: UpdateVehicleDto): Promise<VehiclePersistence> {
    return await this.database.vehicle.update({
      data: updateVehicleDto,
      where: { id }
    });
  }

  async find(id: string): Promise<VehiclePersistence> {
    const vehicle = await this.database.vehicle.findFirst({
      where: { id }
    });

    if (!vehicle) {
      throw new NotFoundException();
    }

    return vehicle;
  }

  async list(
    active?: boolean,
    rented?: boolean
  ): Promise<VehiclePersistence[]> {
    return await this.database.vehicle.findMany({
      where: {
        isActive: active ?? true,
        isRented: rented ?? false
      }
    });
  }
}
