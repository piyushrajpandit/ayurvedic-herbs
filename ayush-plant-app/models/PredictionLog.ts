import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPredictionLog extends Document {
  species: string;
  confidence: number;
  isLowConfidence: boolean;
  top3Candidates: Array<{ species: string; confidence: number }>;
  clientIp?: string;
  location?: {
    latitude?: number;
    longitude?: number;
    locationName?: string;
    state?: string;
  };
  createdAt: Date;
}

const PredictionLogSchema = new Schema<IPredictionLog>(
  {
    species: { type: String, required: true, index: true },
    confidence: { type: Number, required: true },
    isLowConfidence: { type: Boolean, default: false },
    top3Candidates: [
      {
        species: { type: String, required: true },
        confidence: { type: Number, required: true },
      },
    ],
    clientIp: { type: String },
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
      locationName: { type: String },
      state: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const PredictionLog: Model<IPredictionLog> =
  mongoose.models.PredictionLog ||
  mongoose.model<IPredictionLog>('PredictionLog', PredictionLogSchema);

export default PredictionLog;
