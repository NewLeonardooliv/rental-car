import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleService } from './vehicle.service';
import { Vehicle as VehiclePersistence } from '@prisma/client';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async list(
    @Query('active') active?: string,
    @Query('rented') rented?: string,
  ): Promise<VehiclePersistence[]> {
    return await this.vehicleService.list(active, rented);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async find(@Param('id') id: string): Promise<VehiclePersistence> {
    return await this.vehicleService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createVehicleDto: CreateVehicleDto,
  ): Promise<VehiclePersistence> {
    return await this.vehicleService.create(createVehicleDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ): Promise<VehiclePersistence> {
    return await this.vehicleService.save(id, updateVehicleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async delete(@Param('id') id: string): Promise<{ deleted: boolean }> {
    const isDeleted = await this.vehicleService.inativate(id);

    return { deleted: isDeleted };
  }
}
