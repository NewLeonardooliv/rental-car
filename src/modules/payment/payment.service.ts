import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from '../reservation/dto/create-reservation.dto';
import { PaymentType } from 'src/types/payment.type';

@Injectable()
export class PaymentService {
  constructor() {}

  calculate(dto: CreateReservationDto) {
    const startDate = new Date(dto.initialDate);
    const endDate = new Date(dto.endDate);

    const difference = endDate.getTime() - startDate.getTime();

    const days = difference / (1000 * 3600 * 24);

    return days * 150;
  }

  processPayment(amount: number, method: PaymentType) {
    console.log(`Processing ${amount} payment via ${method}`);
  }
}
