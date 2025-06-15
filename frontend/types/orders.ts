// Order from backend API (basic order details)
export type Order = {
  _id: string;
  user: string;
  products: {
    product: string;
    quantity: number;
  }[];
  paymentIntent: {
    id: string;
    amount: number;
    currency: string;
    status: string;
    created: number;
  };
  orderStatus: {
    type: string;
    updated: Date;
  };
  createdAt: Date;
  updatedAt: Date;
};

// Payload for creating an order
export type CreateOrderPayload = {
  items: {
    product: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  shippingAddress: {
    address: string;
    state: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentInfo: {
    cardholderName: string;
    cardNumber: string;
    expirationDate: string;
    cvv: string;
  };
};

// For tracking individual items in a user's order
export type OrderItem = {
  _id: string;
  quantity: number;
  price: number;
  product: {
    _id: string;
    name: string;
    description: string;
    imageUrls?: {
      data: number[];
      type: string;
    }[];
  };
};

// For displaying full user orders in frontend
export type UserOrders = {
  _id: string;
  status: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  total: number;
  items: OrderItem[];
  shippingAddress: {
    address: string;
    state: string;
    street: string;
    country: string;
    city: string;
  };
};
