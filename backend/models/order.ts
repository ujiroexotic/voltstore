import { Schema, model, Document } from 'mongoose';
import { OrderItem, OrderStatus, ShippingAddress } from './types';
import e from 'express';

interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  items: OrderItem[];
  total: number;
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true },
    }
  ],
  total: { type: Number, required: true },
  shippingAddress: {
    address: { type: String, required: true },
    state: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
}, { timestamps: true });

const Order = model<IOrder>('Order', orderSchema);
export default Order;
