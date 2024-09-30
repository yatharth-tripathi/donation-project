import mongoose, { Schema, Document } from 'mongoose';

interface IReport extends Document {
  charityId: number;
  reporter: string;
  reason: string;
  timestamp: number;
}

const ReportSchema = new Schema<IReport>({
  charityId: { type: Number, required: true },
  reporter: { type: String, required: true },
  reason: { type: String, required: true },
  timestamp: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.models.Report || mongoose.model<IReport>('Report', ReportSchema);
