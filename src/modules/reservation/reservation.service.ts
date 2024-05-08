import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../service/database/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation as ReservationPersistence } from '@prisma/client';

@Injectable()
export class ReservationService {
  constructor(
    private readonly database: PrismaService,
  ) { }

  async create(createReservationDto: CreateReservationDto): Promise<ReservationPersistence> {
    return await this.database.reservation.create({
      data: createReservationDto
    });
  }

  async save(id: string, updateReservationDto: UpdateReservationDto): Promise<ReservationPersistence> {
    if (!await this.find(id)) {
      throw new NotFoundException();
    }

    return await this.database.Reservation.update({
      data: updateReservationDto,
      where: { id }
    });
  }

  async inativate(id: string): Promise<boolean> {
    if (!await this.find(id)) {
      throw new NotFoundException();
    }

    const reservation = await this.database.reservation.update({
      data: {
        isActive: false
      },
      where: { id }
    });

    if (!reservation) {
      throw new NotFoundException();
    }

    return true;
  }

  async find(id: string) {
    return await this.database.reservation.findFirst({ where: { id } });
  }

  async findOne(id: string): Promise<reservationPersistence> {
    const reservation = await this.database.reservation.findFirst({
      where: { id }
    });

    if (!reservation) {
      throw new NotFoundException();
    }

    return reservation;
  }

  async list(
    active?: string,
    rented?: string
  ): Promise<reservationPersistence[]> {
    const isActive = active ? active === 'true' : true;
    const isRented = rented ? rented === 'true' : false;

    return await this.database.reservation.findMany({
      where: {
        isActive,
        isRented
      }
    });
  }
}
