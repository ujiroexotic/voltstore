type Order = {
  _id: string;
  user: string;
  products: [
    {
      product: string;
      quantity: number;
    }
  ];
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

export type { Order };

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

export type OrderItem = {
  _id: string;
  product: string;
  quantity: number;
  price: number;
};

// export type UserOrders = {
//     _id: string;
//     user: string;
//     total: number;
//     isDelivered: boolean;
//     isPaid: boolean;
//     status: string;
//     createdAt: string;
//     updatedAt: string;
//     items: {
//       _id: string;
//       quantity: number;
//       price: number;
//       product: {
//         _id: string;
//         name: string;
//         description: string;
//         category: string;
//         price: number;
//         stock: number;
//         imageUrls: { url: string }[];
//         createdAt: string;
//         updatedAt: string;
//       };
//     }[];
//     shippingAddress: {
//       address: string;
//       state: string;
//       street: string;
//     };
//   };
  export type UserOrders = {
    _id: string;
    status: string;
    isPaid: boolean;
    isDelivered: boolean;
    createdAt: string;
    total: number;
    items: {
      _id: string;
      quantity: number;
      price: number;
      product: {
        name: string;
        description: string;
      };
    }[];
    shippingAddress: {
      address: string;
      state: string;
      street: string;
      country: string;
      city: string;
    };
  };
  