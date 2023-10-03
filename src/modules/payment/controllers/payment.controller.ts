import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import Stripe from 'stripe';

@Controller('payment')
export class PaymentController {
  constructor(private readonly stripe: Stripe) {}
  @UseGuards(AuthGuard)
  @Post()
  checkout() {
    console.log('Oi');
  }
}
