import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { PrismaService } from '../../service/database/prisma.service';
import { VehicleService } from './vehicle.service';

@Module({
  controllers: [VehicleController],
  providers: [PrismaService, VehicleService],
})
export class VehicleModule {}
