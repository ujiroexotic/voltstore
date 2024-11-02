import exp from 'constants';
import { Schema, model, Document } from 'mongoose';

interface IPayment extends Document {
  order: Schema.Types.ObjectId;
  paymentMethod: string;
  amount: number;
  status: string;
  transactionId: string;
  paidAt: Date;
}

const paymentSchema = new Schema<IPayment>({
  order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  paymentMethod: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
  transactionId: { type: String, required: true },
  paidAt: { type: Date, required: true },
});

const Payment = model<IPayment>('Payment', paymentSchema);
export default Payment;
