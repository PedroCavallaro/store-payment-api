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

  async checkout(product: Checkout) {
    console.log(product.payment_method_id);
    let intent = null;
    if (product.payment_method_id) {
      intent = await this.stripe.paymentIntents.create({
        payment_method: product.payment_method_id,
        amount: 1 * 100,
        currency: 'brl',
        confirmation_method: 'manual',
        confirm: true,
        payment_method_types: ['card'],
        return_url: 'http://localhost:3000',
      });
      return this.generateResponse(intent);
    } else {
      await this.paymentsQueue.add('validate-payment', product);
    }
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
