import { Injectable } from '@nestjs/common';
import { PaymentType } from 'src/types/payment.type';

@Injectable()
export class PaymentService {
  static PRICE: number = 150.0;

  constructor() {}

  calculate(startDate: Date, endDate: Date): number {
    const difference = endDate.getTime() - startDate.getTime();

    const days = difference / (1000 * 3600 * 24);

    if (days <= 0) {
      return PaymentService.PRICE;
    }

    return days * PaymentService.PRICE;
  }

  processPayment(amount: number, method: PaymentType): string {
    return `Processing ${amount} payment via ${method}`;
  }
}
