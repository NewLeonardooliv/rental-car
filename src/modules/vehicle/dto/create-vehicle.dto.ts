import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const vehicleCreateSchema = z.object({
  brand: z.string().min(2),
  model: z.string(),
  year: z.number(),
  licensePlate: z.string().max(7),
});

export class CreateVehicleDto extends createZodDto(vehicleCreateSchema) {
  readonly brand: string;
  readonly model: string;
  readonly year: number;
  readonly licensePlate: string;
}
