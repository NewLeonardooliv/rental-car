import { PaymentService } from './payment.service';
import { PaymentType } from 'src/types/payment.type';

describe('PaymentService', () => {
  let paymentService: PaymentService;

  beforeEach(() => {
    paymentService = new PaymentService();
  });

  describe('calculate', () => {
    it('should correctly calculate the total cost for a reservation', () => {
      const totalCost = paymentService.calculate(
        new Date('2024-04-01'),
        new Date('2024-04-04'),
      );

      expect(totalCost).toBe(450);
    });

    it('should handle zero days difference', () => {
      const totalCost = paymentService.calculate(
        new Date('2024-04-01'),
        new Date('2024-04-01'),
      );

      expect(totalCost).toBe(PaymentService.PRICE);
    });
  });

  describe('processPayment', () => {
    it('should process payment correctly', () => {
      const amount = 450;
      const method = 'credit' as PaymentType;

      const payment = paymentService.processPayment(amount, method);

      expect(payment).toBe(`Processing ${amount} payment via ${method}`);
    });
  });
});
