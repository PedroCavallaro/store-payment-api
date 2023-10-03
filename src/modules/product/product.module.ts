import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { RedisService } from 'src/cache/redis.service';

@Module({
  providers: [ProductService, RedisService],
  controllers: [ProductController],
})
export class ProductModule {}
