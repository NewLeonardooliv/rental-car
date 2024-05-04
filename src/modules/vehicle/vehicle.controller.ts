import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleService } from './vehicle.service';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  async list() {
    return await this.vehicleService.list();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async find(@Param('id') id: string) {
    return await this.vehicleService.find(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    return await this.vehicleService.create(createVehicleDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return await this.vehicleService.save(id, updateVehicleDto);
  }
}
