// eslint-disable-next-line @typescript-eslint/no-unused-vars
type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  email_verified: boolean;
  phone: string;
  address: {
    address1: string;
    address2: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  created_at: Date;
  updated_at: Date;
};

export = User;
