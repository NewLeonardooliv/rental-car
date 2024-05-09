import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const reservationCreateSchema = z.object({
    vehicleId: z.string().uuid(),
    price: z.number().min(1),
    initialDate: z.string(),
    endDate: z.string(),
});

export class CreateReservationDto extends createZodDto(reservationCreateSchema) {
    readonly vehicleId: string;
    readonly initialDate: string;
    readonly price  : number;
    readonly endDate: string;
}
