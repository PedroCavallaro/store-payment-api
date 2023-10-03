import { DbModule } from './database/db.module';
import { RedisService } from './cache/redis.service';
import { ProductModule } from './modules/product/product.module';
import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { PaymentModule } from './modules/payment/payment.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [ProductModule, AuthModule, DbModule, PaymentModule, StripeModule],
  controllers: [],
  providers: [RedisService],
})
export class AppModule {}
