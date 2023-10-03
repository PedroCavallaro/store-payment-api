import { Module } from '@nestjs/common';
import { PaymentController } from './controllers/payment.controller';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PaymentService } from './services/payment.service';
import { StripeModule } from 'src/stripe/stripe.module';
import { BullModule } from '@nestjs/bull';
import { PaymentValidationConsumer } from './jobs/payment.consumer';

@Module({
  imports: [
    StripeModule,
    BullModule.registerQueue({
      name: 'payments-queue',
    }),
  ],
  controllers: [PaymentController],
  providers: [AuthGuard, PaymentService, PaymentValidationConsumer],
})
export class PaymentModule {}
