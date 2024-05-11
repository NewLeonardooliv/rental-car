import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationService } from './reservation.service';
import { Reservation as ReservationPersistence } from '@prisma/client';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get(':id')
  @HttpCode(HttpStatus.CREATED)
  async find(@Param('id') id: string): Promise<ReservationPersistence> {
    return await this.reservationService.find(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createReservationDto: CreateReservationDto,
  ): Promise<ReservationPersistence> {
    return await this.reservationService.create(createReservationDto);
  }
}
