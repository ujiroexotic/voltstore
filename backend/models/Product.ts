import { Schema, model, Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrls: string[];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    imageUrls: [{ type: Buffer, required: true }], // Now each image is stored as binary data
  },
  { timestamps: true }
);

const Product = model<IProduct>("Product", productSchema);
export default Product;
