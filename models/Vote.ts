import mongoose, { Schema, Document } from 'mongoose';

export interface IVote extends Document {
  charityId: mongoose.Types.ObjectId; 
  userId: mongoose.Types.ObjectId;   
  vote: 'upvote' | 'downvote';       
  createdAt: Date;                    
}

const VoteSchema: Schema = new Schema(
  {
    charityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Charity',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    vote: {
      type: String,
      enum: ['upvote', 'downvote'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Vote = mongoose.models.Vote || mongoose.model<IVote>('Vote', VoteSchema);
export default Vote;
