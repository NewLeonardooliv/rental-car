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
import { createReservationDto } from './dto/create-reservation.dto';
import { UpdatereservationDto } from './dto/update-reservation.dto';
import { reservationService } from './reservation.service';
import { reservation as reservationPersistence } from '@prisma/client';