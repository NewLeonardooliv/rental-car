import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { PaymentService } from '../payment/payment.service';
import { PrismaService } from '../../service/database/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Reservation as ReservationPersistence } from '@prisma/client';

describe('ReservationService', () => {
  let service: ReservationService;
  let prisma: PrismaService;
  let payment: PaymentService;

  const mockPrismaService = {
    reservation: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  };

  const mockPaymentService = {
    calculate: jest.fn(),
    processPayment: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: PaymentService, useValue: mockPaymentService },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    prisma = module.get<PrismaService>(PrismaService);
    payment = module.get<PaymentService>(PaymentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    it('should return a reservation if it exists', async () => {
      const mockReservation: ReservationPersistence = {
        id: '1',
        vehicleId: '1234',
        initialDate: new Date('2024-04-01'),
        endDate: new Date('2024-04-05'),
        price: 600,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (prisma.reservation.findFirst as jest.Mock).mockResolvedValue(
        mockReservation,
      );

      const reservation = await service.find('1');

      expect(reservation).toEqual(mockReservation);
      expect(prisma.reservation.findFirst).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException if no reservation is found', async () => {
      (prisma.reservation.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.find('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    const mockCreateDto: CreateReservationDto = {
      vehicleId: '1234',
      initialDate: '2024-04-01',
      endDate: '2024-04-04',
      paymentMethod: 'credit',
    };

    it('should create and return a new reservation', async () => {
      const mockCreatedReservation: ReservationPersistence = {
        id: '1',
        vehicleId: '1234',
        initialDate: new Date('2024-04-01'),
        endDate: new Date('2024-04-04'),
        price: 450,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.reservation.create as jest.Mock).mockResolvedValue(
        mockCreatedReservation,
      );

      (prisma.reservation.findFirst as jest.Mock).mockResolvedValue(null);

      (payment.calculate as jest.Mock).mockReturnValue(450);

      const reservation = await service.create(mockCreateDto);

      expect(reservation).toEqual(mockCreatedReservation);
      expect(payment.calculate).toHaveBeenCalledWith(
        new Date(mockCreateDto.initialDate),
        new Date(mockCreateDto.endDate),
      );
      expect(payment.processPayment).toHaveBeenCalledWith(450, 'credit');
      expect(prisma.reservation.create).toHaveBeenCalledWith({
        data: {
          vehicleId: '1234',
          initialDate: new Date('2024-04-01'),
          endDate: new Date('2024-04-04'),
          price: 450,
        },
      });
    });

    it('should throw BadRequestException if dates are invalid', async () => {
      const invalidDto: CreateReservationDto = {
        vehicleId: '1234',
        initialDate: 'invalid-date',
        endDate: 'another-invalid-date',
        paymentMethod: 'credit',
      };

      await expect(service.create(invalidDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if dates are reversed', async () => {
      const reversedDatesDto: CreateReservationDto = {
        vehicleId: '1234',
        initialDate: '2024-04-05',
        endDate: '2024-04-01',
        paymentMethod: 'credit',
      };

      await expect(service.create(reversedDatesDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if the vehicle is already reserved', async () => {
      (prisma.reservation.findFirst as jest.Mock).mockResolvedValue({
        id: '2',
        vehicleId: '1234',
        initialDate: new Date('2024-04-01'),
        endDate: new Date('2024-04-04'),
        price: 450,
      });

      await expect(service.create(mockCreateDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
