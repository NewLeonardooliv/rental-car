import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../service/database/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation as ReservationPersistence } from '@prisma/client';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class ReservationService {
  constructor(
    private readonly database: PrismaService,
    private readonly paymentService: PaymentService,
  ) {}

  async find(id: string): Promise<ReservationPersistence> {
    const reservation = await this.database.reservation.findFirst({
      where: { id },
    });

    if (!reservation) {
      throw new NotFoundException();
    }

    return reservation;
  }

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<ReservationPersistence> {
    const initialDate = new Date(createReservationDto.initialDate);
    const endDate = new Date(createReservationDto.endDate);

    if (isNaN(initialDate.getTime()) || isNaN(endDate.getTime())) {
      throw new BadRequestException('Invalid date format');
    }

    if (initialDate > endDate) {
      throw new BadRequestException('Initial date cannot be after end date');
    }

    if (endDate < initialDate) {
      throw new BadRequestException('End date cannot be before initial date');
    }

    const isReserved = await this.database.reservation.findFirst({
      where: {
        vehicleId: createReservationDto.vehicleId,
        OR: [
          {
            endDate: {
              lte: endDate,
              gte: initialDate,
            },
            initialDate: {
              lte: endDate,
              gte: initialDate,
            },
          },
        ],
      },
    });

    if (!!isReserved) {
      throw new BadRequestException('Data já reservada para esse veiculo.');
    }

    const { paymentMethod, ...restOfDto } = createReservationDto;

    const price = this.paymentService.calculate(createReservationDto);
    this.paymentService.processPayment(price, paymentMethod);

    return await this.database.reservation.create({
      data: {
        ...restOfDto,
        price,
        endDate,
        initialDate,
      },
    });
  }
}
