import { DbModule } from './database/db.module';
import { ProductModule } from './modules/product/product.module';
import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { PaymentModule } from './modules/payment/payment.module';
import { StripeModule } from './stripe/stripe.module';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { MAIL_HOST, MAILER_USER, MAILER_PASSWORD } from 'constants/constants';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductModule,
    AuthModule,
    DbModule,
    StripeModule,
    PaymentModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MailerModule.forRoot({
      transport: {
        host: MAIL_HOST,
        port: 587,
        auth: {
          user: MAILER_USER,
          pass: MAILER_PASSWORD,
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
