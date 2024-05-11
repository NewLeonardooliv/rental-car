import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../service/database/prisma.service';
import { VehicleService } from './vehicle.service';
import { Vehicle as VehiclePersistence } from '@prisma/client';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

const mockVehicle: VehiclePersistence = {
  id: '1',
  brand: 'Toyota',
  model: 'Corolla',
  year: 2020,
  licensePlate: 'ABC-1234',
  isActive: true,
  isRented: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockPrismaService = {
  vehicle: {
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
  },
};

describe('VehicleService', () => {
  let service: VehicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<VehicleService>(VehicleService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new vehicle', async () => {
      const createVehicleDto: CreateVehicleDto = {
        brand: 'Toyota',
        model: 'Corolla',
        year: 2020,
        licensePlate: 'DEF-5678',
      };

      mockPrismaService.vehicle.findFirst.mockResolvedValue(null);
      mockPrismaService.vehicle.create.mockResolvedValue({
        ...mockVehicle,
        ...createVehicleDto,
      });

      const result = await service.create(createVehicleDto);
      expect(result).toEqual({ ...mockVehicle, ...createVehicleDto });
      expect(mockPrismaService.vehicle.findFirst).toHaveBeenCalledWith({
        where: { licensePlate: 'DEF-5678' },
      });
      expect(mockPrismaService.vehicle.create).toHaveBeenCalledWith({
        data: createVehicleDto,
      });
    });

    it('should throw an error if the license plate already exists', async () => {
      const createVehicleDto: CreateVehicleDto = {
        brand: 'Toyota',
        model: 'Corolla',
        year: 2020,
        licensePlate: 'ABC-1234',
      };

      mockPrismaService.vehicle.findFirst.mockResolvedValue(mockVehicle);

      await expect(service.create(createVehicleDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('save', () => {
    it('should update the vehicle', async () => {
      const updateVehicleDto: UpdateVehicleDto = {
        brand: 'Toyota',
        model: 'Camry',
        year: 2021,
        licensePlate: 'ABC-1234',
      };

      mockPrismaService.vehicle.findFirst.mockResolvedValue(mockVehicle);
      mockPrismaService.vehicle.update.mockResolvedValue({
        ...mockVehicle,
        ...updateVehicleDto,
      });

      const result = await service.save('1', updateVehicleDto);
      expect(result).toEqual({ ...mockVehicle, ...updateVehicleDto });
      expect(mockPrismaService.vehicle.update).toHaveBeenCalledWith({
        data: updateVehicleDto,
        where: { id: '1' },
      });
    });

    it('should throw an error if the vehicle is not found', async () => {
      mockPrismaService.vehicle.findFirst.mockResolvedValue(null);

      const updateVehicleDto: UpdateVehicleDto = {
        brand: 'Toyota',
        model: 'Camry',
        year: 2021,
        licensePlate: 'ABC-1234',
      };

      await expect(service.save('999', updateVehicleDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('inativate', () => {
    it('should inactivate the vehicle', async () => {
      mockPrismaService.vehicle.findFirst.mockResolvedValue(mockVehicle);
      mockPrismaService.vehicle.update.mockResolvedValue({
        ...mockVehicle,
        isActive: false,
      });

      const result = await service.inativate('1');
      expect(result).toBe(true);
      expect(mockPrismaService.vehicle.update).toHaveBeenCalledWith({
        data: { isActive: false },
        where: { id: '1' },
      });
    });

    it('should throw an error if the vehicle is not found', async () => {
      mockPrismaService.vehicle.findFirst.mockResolvedValue(null);

      await expect(service.inativate('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a vehicle by ID', async () => {
      mockPrismaService.vehicle.findFirst.mockResolvedValue(mockVehicle);

      const result = await service.findOne('1');
      expect(result).toEqual(mockVehicle);
    });

    it('should throw an error if the vehicle is not found', async () => {
      mockPrismaService.vehicle.findFirst.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('list', () => {
    it('should return a list of vehicles', async () => {
      const mockVehicles = [mockVehicle, { ...mockVehicle, id: '2' }];
      mockPrismaService.vehicle.findMany.mockResolvedValue(mockVehicles);

      const result = await service.list('true', 'false');
      expect(result).toEqual(mockVehicles);
      expect(mockPrismaService.vehicle.findMany).toHaveBeenCalledWith({
        where: { isActive: true, isRented: false },
      });
    });
  });
});
