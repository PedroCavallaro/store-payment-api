import { Module } from '@nestjs/common';
import { PaymentController } from './controllers/payment.controller';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/guards/auth.guard';

@Module({
  controllers: [PaymentController],
  providers: [AuthGuard],
})
export class PaymentModule {}
