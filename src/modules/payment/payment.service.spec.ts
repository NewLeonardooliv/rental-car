import { PaymentService } from './payment.service';
import { PaymentType } from 'src/types/payment.type';

describe('PaymentService', () => {
  let paymentService: PaymentService;

  beforeEach(() => {
    paymentService = new PaymentService();
  });

  describe('calculate', () => {
    it('should correctly calculate the total cost for a reservation', () => {
      const dto = {
        vehicleId: '1234',
        initialDate: '2024-04-01',
        endDate: '2024-04-04',
        paymentMethod: 'credit' as PaymentType,
      };

      const totalCost = paymentService.calculate(dto);

      expect(totalCost).toBe(450);
    });

    it('should handle zero days difference', () => {
      const dto = {
        vehicleId: '1234',
        initialDate: '2024-04-01',
        endDate: '2024-04-01',
        paymentMethod: 'credit' as PaymentType,
      };

      const totalCost = paymentService.calculate(dto);

      expect(totalCost).toBe(150);
    });
  });

  describe('processPayment', () => {
    it('should process payment correctly', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const amount = 450;
      const method = 'credit' as PaymentType;

      paymentService.processPayment(amount, method);

      expect(consoleSpy).toHaveBeenCalledWith(
        `Processing ${amount} payment via ${method}`,
      );
    });
  });
});
