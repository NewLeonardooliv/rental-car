import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

export const ZOD_PROVIDER = {
  provide: APP_PIPE,
  useClass: ZodValidationPipe,
};
