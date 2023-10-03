import { Module, Provider } from '@nestjs/common';
import { STRIPE_SECRET_KEY } from 'constants/constants';
import Stripe from 'stripe';

const stripeProvider: Provider = {
  provide: Stripe,
  useValue: new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2023-08-16',
  }),
};

@Module({
  providers: [stripeProvider],
  exports: [stripeProvider],
})
export class StripeModule {}
