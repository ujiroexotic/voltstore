import mongoose, { ObjectId } from 'mongoose';

/** User Roles */
export type UserRole = 'customer' | 'admin';

/** Order Status */
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  
  /** Cart Item Type */
export interface CartItem {
  product: mongoose.Types.ObjectId; // Product ID
  quantity: number;
  price: number;
  _id?: mongoose.Types.ObjectId; // Optional ID field
}

/** Order Item Type */
export interface OrderItem extends CartItem {}

/** Shipping Address Type */
export interface ShippingAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}
