export class Checkout {
  payment_method_id: string;
  payment_intent_id: string;
  totalAmount: number;
  products: [
    {
      productId: number;
      amount: number;
    },
  ];
  name: string;
  email: string;
}
