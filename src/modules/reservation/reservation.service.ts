import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../service/database/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation as ReservationPersistence } from '@prisma/client';

@Injectable()
export class ReservationService {
  constructor(
    private readonly database: PrismaService,
  ) { }

  async create(createReservationDto: CreateReservationDto): Promise<ReservationPersistence> {
    const isReserved = await this.database.reservation.findFirst({
      where: {
        vehicleId: createReservationDto.vehicleId,
        OR: [{          
          endDate: {
            lte: new Date(createReservationDto.endDate),
            gte: new Date(createReservationDto.initialDate)
          },
          initialDate: {
            lte: new Date(createReservationDto.endDate),
            gte: new Date(createReservationDto.initialDate)
          }
        }]
      }
    })

    if (!!isReserved) {
      throw new BadRequestException('Data já reservada para esse veiculo.');
    }

    return await this.database.reservation.create({
      data: {
        ...createReservationDto,
        initialDate: new Date(createReservationDto.initialDate),
        endDate: new Date(createReservationDto.endDate)
      }
    });
  }
}
