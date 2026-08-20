import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFeedbackLog extends Document {
  predictedSpecies: string;
  suggestedCorrectSpecies: string;
  confidence: number;
  comments?: string;
  clientIp?: string;
  createdAt: Date;
}

const FeedbackLogSchema = new Schema<IFeedbackLog>(
  {
    predictedSpecies: { type: String, required: true },
    suggestedCorrectSpecies: { type: String, required: true },
    confidence: { type: Number, required: true },
    comments: { type: String },
    clientIp: { type: String },
  },
  {
    timestamps: true,
  }
);

const FeedbackLog: Model<IFeedbackLog> =
  mongoose.models.FeedbackLog ||
  mongoose.model<IFeedbackLog>('FeedbackLog', FeedbackLogSchema);

export default FeedbackLog;
