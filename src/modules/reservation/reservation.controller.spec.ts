import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

describe('ReservationController', () => {
  let controller: ReservationController;
  let service: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [
        {
          provide: ReservationService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              vehicleId: 'vehicleId',
              initialDate: 'initialDate',
              price: 150,
              endDate: 'endDate',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
    service = module.get<ReservationService>(ReservationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('should create and return the vehicle', async () => {
      const dto: CreateReservationDto = {
        vehicleId: 'vehicleId',
        initialDate: 'initialDate',
        price: 150,
        endDate: 'endDate',
      };
      const result = await controller.create(dto);
      expect(result).toEqual({
        vehicleId: 'vehicleId',
        initialDate: 'initialDate',
        price: 150,
        endDate: 'endDate',
      });
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });
});
