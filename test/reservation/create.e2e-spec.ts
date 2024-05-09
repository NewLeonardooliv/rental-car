import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { ReservationService } from '../../src/modules/reservation/reservation.service';
import { ReservationController } from '../../src/modules/reservation/reservation.controller'; // Adjust this path to your actual controller path

describe('ReservationController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController], // Include the controller
      providers: [ReservationService],
    })
      .overrideProvider(ReservationService)
      .useValue({
        create: jest.fn().mockResolvedValue({
            vehicleId: "1",
            price: 200,
            initialDate: "2024-05-09",
            endDate: "2024-05-10"
        }),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/reservation (POST)', async () => {
    return request(app.getHttpServer())
      .post('/reservation')
      .send({ 
        vehicleId: "1",
        price: 200,
        initialDate: "2024-05-09",
        endDate: "2024-05-10"
      })
      .expect(HttpStatus.OK)
      .expect({
        vehicleId: "1",
        price: 200,
        initialDate: "2024-05-09",
        endDate: "2024-05-10"
      });
  });

  afterAll(async () => {
    await app.close(); 
  });
});
