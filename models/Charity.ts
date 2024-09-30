import mongoose, { Schema, Document } from 'mongoose';

export interface ICharity extends Document {
  id: number;
  owner: string;
  name: string;
  description: string;
  imageUrl: string;
  goalAmount: number;
  raisedAmount: number;
  deadline: number;
  isActive: boolean;
  isPaused: boolean;
  isBanned: boolean;
  milestones: number[];
  currentMilestone: number;
}

const CharitySchema = new Schema<ICharity>({
  id: { type: Number, required: true },
  owner: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  goalAmount: { type: Number, required: true },
  raisedAmount: { type: Number, default: 0 },
  deadline: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  isPaused: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false },
  milestones: [{ type: Number }],
  currentMilestone: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Charity || mongoose.model<ICharity>('Charity', CharitySchema);
