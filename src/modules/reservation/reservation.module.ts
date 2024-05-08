import { Module } from '@nestjs/common';
import { PrismaService } from '../../service/database/prisma.service';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

@Module({
  controllers: [ReservationController],
  providers: [PrismaService, ReservationService],
})
export class ReservationModule {}
