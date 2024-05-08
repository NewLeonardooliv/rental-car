import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const reservationCreateSchema = z.object({
    vehicle: z.object({
        brand: z.string().min(2),
        model: z.string().min(2),
        year: z.number().min(1),
        licensePlate: z.string().max(7),
    }),
    price: z.number().min(1),
    iniDate: z.date(),
    endDate: z.date(),
});

export class UpdateReservationDto extends createZodDto(reservationCreateSchema) {
    readonly vehicle: {
        readonly brand: string;
        readonly model: string;
        readonly year: number;
        readonly licensePlate: string;
    };
    readonly price  : number;
    readonly iniDate: Date;
    readonly endDate: Date;
}
