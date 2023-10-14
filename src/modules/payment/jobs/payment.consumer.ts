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
    private readonly dbService: DbService,
    private readonly stripe: Stripe,
  ) {}
  @Process('validate-payment')
  async validatePaymetJob(job: Job<Checkout>) {
    const { data } = job;

    const orderSql = `INSERT INTO ORDERS(TOTAL_AMOUNT, PAYMENT_STATUS) VALUES(
      $1,
      $2
    )
    RETURNING
        id`;
    try {
      let intent = null;
      if (data.payment_method_id) {
        intent = await this.stripe.paymentIntents.create({
          payment_method: data.payment_method_id,
          amount: data.totalAmount * 100,
          currency: 'brl',
          confirmation_method: 'manual',
          confirm: true,
          payment_method_types: ['card'],
          return_url: 'http://localhost:3000',
        });

        if (intent.status === 'succeeded') {
          const { rows } = await this.dbService.query(orderSql, [
            data.totalAmount,
            true,
          ]);

          data.products.forEach(async ({ productId, amount }) => {
            await this.dbService.query(
              `INSERT INTO ORDER_ITENS(ORDER_ID, PRODUCT_ID, AMOUNT) VALUES(${rows[0].id}, ${productId}, ${amount})`,
            );
          });

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
