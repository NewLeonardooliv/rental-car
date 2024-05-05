import { Module } from '@nestjs/common';
import { VehicleModule } from './vehicle/vehicle.module';
import { ZOD_PROVIDER } from '../constants/providers.constant';

@Module({
  imports: [
    VehicleModule
  ],
  controllers: [],
  providers: [ZOD_PROVIDER],
})
export class AppModule {}
