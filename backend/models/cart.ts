import { Schema, model, Document } from 'mongoose';
import { CartItem } from './types';

interface ICart extends Document {
  user: Schema.Types.ObjectId;
  items: CartItem[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new Schema<ICart>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true },
    }
  ],
  total: { type: Number, required: true, default: 0 },
}, { timestamps: true });

const Cart = model<ICart>('Cart', cartSchema);
export default Cart;
