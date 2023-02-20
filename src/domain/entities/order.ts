// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Order = {
  id: string;
  user_id: string;
  cart_id: string;
  paymentId: string;
  delivered: boolean;
  created_at: Date;
  updated_at: Date;
};

export = Order;
