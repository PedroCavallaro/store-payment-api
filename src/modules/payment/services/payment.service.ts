import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  constructor(
    @InjectQueue('payments-queue') private readonly paymentsQueue: Queue,
    private readonly stripe: Stripe,
  ) {}

  async checkout(product: string) {
    await this.paymentsQueue.add('validate-payment', product);
  }
}
