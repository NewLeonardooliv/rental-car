import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';

describe('VehicleController', () => {
  let controller: VehicleController;
  let service: VehicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [
        {
          provide: VehicleService,
          useValue: {
            list: jest.fn().mockResolvedValue([{ id: '1', make: 'Toyota', model: 'Corolla', year: 2022 }]),
            find: jest.fn().mockResolvedValue({ id: '1', make: 'Toyota', model: 'Corolla', year: 2022 }),
            create: jest.fn().mockResolvedValue({ id: '1', make: 'Toyota', model: 'Corolla', year: 2022 }),
            save: jest.fn().mockResolvedValue({ id: '1', make: 'Toyota', model: 'Corolla', year: 2023 }),
          },
        },
      ],
    }).compile();

    controller = module.get<VehicleController>(VehicleController);
    service = module.get<VehicleService>(VehicleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should return an array of vehicles', async () => {
      const result = await controller.list();
      expect(result).toEqual([{ id: '1', make: 'Toyota', model: 'Corolla', year: 2022 }]);
      expect(service.list).toHaveBeenCalled();
    });
  });

  describe('find', () => {
    it('should return a single vehicle object', async () => {
      const result = await controller.find('1');
      expect(result).toEqual({ id: '1', make: 'Toyota', model: 'Corolla', year: 2022 });
      expect(service.find).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create and return the vehicle', async () => {
      const dto = { brand: 'Toyota', model: 'Corolla', year: 2022, licensePlate: '2202AA2' };
      const result = await controller.create(dto);
      expect(result).toEqual({ id: '1', make: 'Toyota', model: 'Corolla', year: 2022 });
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should update and return the vehicle', async () => {
      const dto = { brand: 'Toyota', model: 'Corolla', year: 2024, licensePlate: '220BB2' };
      const result = await controller.update('1', dto);
      expect(result).toEqual({ id: '1', make: 'Toyota', model: 'Corolla', year: 2023 });
      expect(service.save).toHaveBeenCalledWith('1', dto);
    });
  });
});
