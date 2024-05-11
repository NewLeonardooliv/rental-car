import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../service/database/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle as VehiclePersistence } from '@prisma/client';

@Injectable()
export class VehicleService {
  constructor(private readonly database: PrismaService) {}

  async create(
    createVehicleDto: CreateVehicleDto,
  ): Promise<VehiclePersistence> {
    if (
      await this.database.vehicle.findFirst({
        where: { licensePlate: createVehicleDto.licensePlate },
      })
    ) {
      throw new BadRequestException(
        'Vehicle with the specified license plate already exists.',
      );
    }

    return await this.database.vehicle.create({
      data: createVehicleDto,
    });
  }

  async save(
    id: string,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<VehiclePersistence> {
    if (!(await this.find(id))) {
      throw new NotFoundException();
    }

    return await this.database.vehicle.update({
      data: updateVehicleDto,
      where: { id },
    });
  }

  async inativate(id: string): Promise<boolean> {
    if (!(await this.find(id))) {
      throw new NotFoundException();
    }

    const vehicle = await this.database.vehicle.update({
      data: {
        isActive: false,
      },
      where: { id },
    });

    if (!vehicle) {
      throw new NotFoundException();
    }

    return true;
  }

  async find(id: string) {
    return await this.database.vehicle.findFirst({ where: { id } });
  }

  async findOne(id: string): Promise<VehiclePersistence> {
    const vehicle = await this.database.vehicle.findFirst({
      where: { id },
    });

    if (!vehicle) {
      throw new NotFoundException();
    }

    return vehicle;
  }

  async list(active?: string, rented?: string): Promise<VehiclePersistence[]> {
    const isActive = active ? active === 'true' : true;
    const isRented = rented ? rented === 'true' : false;

    return await this.database.vehicle.findMany({
      where: {
        isActive,
        isRented,
      },
    });
  }
}
