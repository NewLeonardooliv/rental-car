import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { ReservationService } from '../../src/modules/reservation/reservation.service';

describe('ReservationController (e2e)', () => {
  let app: INestApplication;
  let reservationService: ReservationService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
    })
      .overrideProvider(ReservationService)
      .useValue({
        create: jest.fn().mockResolvedValue({
            vehicleId: "1",
            price:200,
            initialDate:"2024-05-09",
            endDate:"2024-05-10" }),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    reservationService = moduleFixture.get(ReservationService);
    await app.init();
  });

  it('/vehicle (POST)', () => {
    return request(app.getHttpServer())
      .post('/vehicle')
      .send({ 
        vehicleId: "1",
        price:200,
        initialDate:"2024-05-09",
        endDate:"2024-05-10"})
      .expect(HttpStatus.CREATED)
      .expect({ 
        vehicleId: "1",
        price:200,
        initialDate:"2024-05-09",
        endDate:"2024-05-10" });
  });
});
