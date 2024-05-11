import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { VehicleModule } from '../../src/modules/vehicle/vehicle.module';
import { VehicleService } from '../../src/modules/vehicle/vehicle.service';

describe('VehicleController (e2e)', () => {
  let app: INestApplication;
  let vehicleService: VehicleService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [VehicleModule],
    })
      .overrideProvider(VehicleService)
      .useValue({
        list: jest
          .fn()
          .mockResolvedValue([
            { id: '1', make: 'Toyota', model: 'Corolla', year: 2022 },
          ]),
        findOne: jest.fn().mockResolvedValue({
          id: '1',
          make: 'Toyota',
          model: 'Corolla',
          year: 2022,
        }),
        create: jest.fn().mockResolvedValue({
          id: '1',
          make: 'Toyota',
          model: 'Corolla',
          year: 2022,
        }),
        save: jest.fn().mockResolvedValue({
          id: '1',
          make: 'Toyota',
          model: 'Corolla',
          year: 2023,
        }),
        inativate: jest.fn().mockResolvedValue(true),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    vehicleService = moduleFixture.get<VehicleService>(VehicleService);
    await app.init();
  });

  it('/vehicle (GET)', () => {
    return request(app.getHttpServer())
      .get('/vehicle')
      .expect(HttpStatus.OK)
      .expect([{ id: '1', make: 'Toyota', model: 'Corolla', year: 2022 }]);
  });

  it('/vehicle/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/vehicle/1')
      .expect(HttpStatus.OK)
      .expect({ id: '1', make: 'Toyota', model: 'Corolla', year: 2022 });
  });

  it('/vehicle (POST)', () => {
    return request(app.getHttpServer())
      .post('/vehicle')
      .send({ make: 'Toyota', model: 'Corolla', year: 2022 })
      .expect(HttpStatus.CREATED)
      .expect({ id: '1', make: 'Toyota', model: 'Corolla', year: 2022 });
  });

  it('/vehicle/:id (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/vehicle/1')
      .send({ year: 2023 })
      .expect(HttpStatus.ACCEPTED)
      .expect({ id: '1', make: 'Toyota', model: 'Corolla', year: 2023 });
  });

  it('/vehicle/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/vehicle/1')
      .expect(HttpStatus.ACCEPTED)
      .expect({ deleted: true });
  });
});
