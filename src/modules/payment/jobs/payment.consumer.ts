import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import Stripe from 'stripe';

@Processor('payments-queue')
export class PaymentValidationConsumer {
  constructor(
    private readonly mailService: MailerService,
    private readonly stripe: Stripe,
  ) {}
  @Process('validate-payment')
  async validatePaymetJob(job: Job) {
    const { data } = job;
    console.log(data);
    console.log(await this.stripe.customers.list());

    await this.mailService.sendMail({
      to: 'earnest.mohr63@ethereal.email',
      from: 'earnest.mohr63@ethereal.email',
      subject: 'ola',
      text: 'oi',
    });
  }
}
