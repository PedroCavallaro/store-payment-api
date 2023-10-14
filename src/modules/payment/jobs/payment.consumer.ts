import { MailerService } from '@nestjs-modules/mailer';
import { OnQueueError, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import Stripe from 'stripe';
import { Checkout } from '../dtos/checkout.dto';
import { UnauthorizedException } from '@nestjs/common';
import { DbService } from 'src/database/db.service';

@Processor('payments-queue')
export class PaymentValidationConsumer {
  constructor(
    private readonly mailService: MailerService,
    private readonly stripe: Stripe,
  ) {}
  @Process('validate-payment')
  async validatePaymetJob(job: Job<Checkout>, dbService: DbService) {
    const { data } = job;

    try {
      let intent = null;
      if (data.payment_intent_id) {
        intent = await this.stripe.paymentIntents.confirm(
          data.payment_method_id,
        );

        if (intent.status === 'succeeded') {
          await this.mailService.sendMail({
            to: `${data.email}`,
            from: 'Loja Ficticia <loja@email.com>',
            subject: 'Pagamento confirmado',
            text: 'Seu pagamento foi concluido com sucesso',
          });
        }
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @OnQueueError()
  async onQueueError(job: Job<Checkout>) {
    const { data } = job;

    await this.mailService.sendMail({
      to: `${data.email}`,
      from: 'Loja Ficticia <loja@email.com>',
      subject: 'Erro no pagamento',
      text: 'Olá! Infelizmente tivemos um erro com seu pagamento',
    });
  }
}
