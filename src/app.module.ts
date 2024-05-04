import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { ZOD_PROVIDER } from './constants/providers.constant';

@Module({
  imports: [
    VehicleModule
  ],
  controllers: [AppController],
  providers: [AppService, ZOD_PROVIDER],
})
export class AppModule {}
