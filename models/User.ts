import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  address: string;
  name: string;
  email: string;
}

const UserSchema = new Schema<IUser>({
  address: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
