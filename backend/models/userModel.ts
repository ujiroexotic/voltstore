//This file defines the structure and schema for the user
//collection in MongoDB using Mongoose.
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}
//Define the User schema outlines all the fields and data type, and provides methods to interact with the database.
const userSchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);
//Export the User model
const User = mongoose.model<IUser>('User', userSchema);

export default User