import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
  } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationService } from './reservation.service';
import { Reservation as ReservationPersistence } from '@prisma/client';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() createReservationDto: CreateReservationDto
  ): Promise<ReservationPersistence> {
    return await this.reservationService.create(createReservationDto);
  }
}