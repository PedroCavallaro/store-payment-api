import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { PaymentService } from '../services/payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // @UseGuards(AuthGuard)
  @Post()
  checkout(@Body() body: any) {
    return this.paymentService.checkout(body);
  }
}
