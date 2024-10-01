import mongoose, { Schema, Document } from 'mongoose';

interface IReport extends Document {
  id: string; 
  charityId: string; 
  reporter: string;
  reason: string;
  timestamp: number;
}

const ReportSchema = new Schema<IReport>({
  id: { type: String, required: true, unique: true }, 
  charityId: { type: String, required: true }, 
  reporter: { type: String, required: true },
  reason: { type: String, required: true },
  timestamp: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.models.Report || mongoose.model<IReport>('Report', ReportSchema);
