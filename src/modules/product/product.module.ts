import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
