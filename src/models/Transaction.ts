import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  date: Date;
  description: string;
  category: string;
}

const transactionSchema = new Schema<ITransaction>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
});

export default mongoose.model<ITransaction>("Transaction", transactionSchema);
