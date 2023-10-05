import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { ProductDto } from 'src/modules/product/dtos/product.dto';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  constructor(
    @InjectQueue('payments-queue') private readonly paymentsQueue: Queue,
    private readonly stripe: Stripe,
  ) {}

  async checkout(product: ProductDto) {
    await this.paymentsQueue.add('validate-payment', product);
  }
}
