import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from '../reservation/dto/create-reservation.dto';
import { PaymentType } from 'src/types/payment.type';

@Injectable()
export class PaymentService {
  constructor() {}

  static PRICE: number = 150.0;

  calculate(dto: CreateReservationDto) {
    const startDate = new Date(dto.initialDate);
    const endDate = new Date(dto.endDate);

    const difference = endDate.getTime() - startDate.getTime();

    const days = difference / (1000 * 3600 * 24);

    if (days <= 0) {
      return PaymentService.PRICE;
    }

    return days * PaymentService.PRICE;
  }

  processPayment(amount: number, method: PaymentType) {
    console.log(`Processing ${amount} payment via ${method}`);
  }
}
