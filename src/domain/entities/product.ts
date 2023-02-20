// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Product = {
  id: string;
  title: string;
  description: string;
  image_path: string[];
  price: number;
  category_id: string;
  reviews_id: string;
  available: boolean;
  created_at: Date;
  updated_at: Date;
};

export = Product;
