// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Cart = {
  id: string;
  items: [
    {
      product_id: string;
      quantity: number;
      price: number;
      title: string;
    }
  ];
  total_qty: number;
  user_id: string;
  created_at: Date;
  updated_at: Date;
};

export = Cart;
