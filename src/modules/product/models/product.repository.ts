import { ProductDto } from '../dtos/product.dto';

export abstract class ProductRepository {
  abstract getAllProducts(): Promise<ProductDto[]>;
  abstract getProductById(id: number): Promise<ProductDto>;
  abstract getProductByTerm(term: string): Promise<ProductDto[]>;
}
