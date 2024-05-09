import { Module } from '@nestjs/common';
import { VehicleModule } from './vehicle/vehicle.module';
import { ZOD_PROVIDER } from '../constants/providers.constant';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    VehicleModule,
    ReservationModule
  ],
  controllers: [],
  providers: [ZOD_PROVIDER],
})
export class AppModule {}
