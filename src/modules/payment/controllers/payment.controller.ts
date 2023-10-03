import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@Controller('payment')
export class PaymentController {
  @UseGuards(AuthGuard)
  @Post()
  checkout() {
    console.log('Oi');
  }
}
