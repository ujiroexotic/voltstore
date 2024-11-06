import { Schema, model, Document } from "mongoose";

interface ICategory extends Document {
  name: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    description: { type: String },
    imageUrl: { data: Buffer, contentType: String }, // Store image data as a Buffer
  },
  { timestamps: true }
);

const Category = model<ICategory>("Category", categorySchema);
export default Category;
