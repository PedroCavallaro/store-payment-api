import { Module } from '@nestjs/common';
import { DbModule } from './database/db.module';
import { RedisService } from './cache/redis.service';
import { ProductModule } from './modules/product/product.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ProductModule, AuthModule, DbModule],
  controllers: [],
  providers: [RedisService],
})
export class AppModule {}
