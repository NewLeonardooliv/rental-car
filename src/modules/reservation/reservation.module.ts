import { Module } from '@nestjs/common';
import { PrismaService } from '../../service/database/prisma.service';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { PaymentService } from '../payment/payment.service';

@Module({
  controllers: [ReservationController],
  providers: [PrismaService, ReservationService, PaymentService],
})
export class ReservationModule {}
