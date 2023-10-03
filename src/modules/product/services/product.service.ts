import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/modules/product/models/product.repository';
import { ProductDto } from '../dtos/product.dto';
import { DbService } from 'src/database/db.service';

@Injectable()
export class ProductService implements ProductRepository {
  constructor(private readonly dbService: DbService) {}
  async getAllProducts(): Promise<ProductDto[]> {
    const { rows: products } = await this.dbService.query(
      'SELECT * FROM PRODUCT',
    );
    return products;
  }
  async getProductById(id: number): Promise<ProductDto> {
    const { rows: products } = await this.dbService.query(
      `SELECT * FROM PRODUCT WHERE id = ${id} `,
    );
    const [product] = products;
    return product;
  }
  async getProductByTerm(term: string): Promise<ProductDto[]> {
    const { rows: products } = await this.dbService.query(
      `SELECT * FROM PRODUCT WHERE name LIKE '${term}%'`,
    );
    return products;
  }
}
