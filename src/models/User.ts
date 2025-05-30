import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
});

export default mongoose.model<IUser>("User", userSchema);
