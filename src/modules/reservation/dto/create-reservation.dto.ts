import { createZodDto } from 'nestjs-zod';
import { PaymentType } from 'src/types/payment.type';
import { z } from 'zod';

const reservationCreateSchema = z.object({
  vehicleId: z.string().uuid(),
  initialDate: z.string().date(),
  endDate: z.string().date(),
  paymentMethod: z.enum(['credit', 'debit', 'boleto']),
});

export class CreateReservationDto extends createZodDto(
  reservationCreateSchema,
) {
  readonly vehicleId: string;
  readonly initialDate: string;
  readonly endDate: string;
  readonly paymentMethod: PaymentType;
}
