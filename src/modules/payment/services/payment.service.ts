import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import Stripe from 'stripe';
import { Checkout } from '../dtos/checkout.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectQueue('payments-queue') private readonly paymentsQueue: Queue,
    private readonly stripe: Stripe,
  ) {}

  async checkout(checkout: Checkout) {
    await this.paymentsQueue.add('validate-payment', checkout);
  }
  generateResponse = (intent) => {
    if (
      intent.status === 'requires_action' &&
      intent.next_action.type === 'use_stripe_sdk'
    ) {
      return {
        requires_action: true,
        payment_intent_client_secret: intent.client_secret,
      };
    } else if (intent.status === 'succeeded') {
      return {
        success: true,
      };
    } else {
      return {
        error: 'Invalid PaymentIntent status',
      };
    }
  };
}
