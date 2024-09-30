import mongoose, { Schema, Document } from 'mongoose';

interface IDonation extends Document {
  charityId: number;
  donor: string;
  amount: number;
  timestamp: number;
  refunded: boolean;
}

const DonationSchema = new Schema<IDonation>({
  charityId: { type: Number, required: true },
  donor: { type: String, required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Number, required: true },
  refunded: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Donation || mongoose.model<IDonation>('Donation', DonationSchema);
