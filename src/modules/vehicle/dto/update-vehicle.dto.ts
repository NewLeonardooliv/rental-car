import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const vehicleUpdateSchema = z.object({
  brand: z.string().min(2).optional(),
  model: z.string().min(2).optional(),
  year: z.number().min(1).optional(),
  licensePlate: z.string().min(7).max(7).optional(),
});

export class UpdateVehicleDto extends createZodDto(vehicleUpdateSchema) {
  readonly brand: string;
  readonly model: string;
  readonly year: number;
  readonly licensePlate: string;
}
