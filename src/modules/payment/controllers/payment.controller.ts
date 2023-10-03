import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { ProductDto } from 'src/modules/product/dtos/product.dto';
import { PaymentService } from '../services/payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @UseGuards(AuthGuard)
  @Post()
  checkout(@Body() body: ProductDto) {
    return this.paymentService.checkout(body.name);
  }
}
