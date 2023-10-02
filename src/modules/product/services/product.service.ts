import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/modules/product/models/product.repository';

@Injectable()
export class ProductService implements ProductRepository {}
