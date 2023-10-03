import { DbModule } from './database/db.module';
import { RedisService } from './cache/redis.service';
import { ProductModule } from './modules/product/product.module';
import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [ProductModule, AuthModule, DbModule, PaymentModule],
  controllers: [],
  providers: [RedisService],
})
export class AppModule {}
