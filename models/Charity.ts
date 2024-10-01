// models/Charity.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ICharity extends Document {
  id: string;
  name: string;
  description: string;
  category: string;
  goalAmount: number;
  deadline: Date;
  owner: string;
  createdAt: Date;
}

const CharitySchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  goalAmount: {
    type: Number,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Charity = mongoose.models.Charity || mongoose.model<ICharity>('Charity', CharitySchema);
export default Charity;
