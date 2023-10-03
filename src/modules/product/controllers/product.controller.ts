import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from '../services/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  getAll() {
    return this.productService.getAllProducts();
  }

  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }
  @Get('term/:term')
  getByTerm(@Param('term') term: string) {
    return this.productService.getProductByTerm(term);
  }
}
