import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdulterant {
  adulterantName: string;
  scientificName?: string;
  visualDifferences: string;
  healthImpacts?: string;
}

export interface ISubstitute {
  substituteName: string;
  scientificName?: string;
  therapeuticRationale: string;
}

export interface IPlant extends Document {
  datasetLabel: string;
  commonName: string;
  ayurvedicName: string;
  scientificName: string;
  medicinalUses: string[];
  partsUsed: string[];
  knownAdulterants: IAdulterant[];
  knownSubstitutes: ISubstitute[];
  regionOfAvailability: string[];
  imageUrl: string;
  isPlaceholderData?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AdulterantSchema = new Schema<IAdulterant>(
  {
    adulterantName: { type: String, required: true },
    scientificName: { type: String },
    visualDifferences: { type: String, required: true },
    healthImpacts: { type: String },
  },
  { _id: false }
);

const SubstituteSchema = new Schema<ISubstitute>(
  {
    substituteName: { type: String, required: true },
    scientificName: { type: String },
    therapeuticRationale: { type: String, required: true },
  },
  { _id: false }
);

const PlantSchema = new Schema<IPlant>(
  {
    datasetLabel: { type: String, required: true, unique: true, index: true },
    commonName: { type: String, required: true },
    ayurvedicName: { type: String, required: true },
    scientificName: { type: String, required: true, index: true },
    medicinalUses: [{ type: String, required: true }],
    partsUsed: [{ type: String, required: true }],
    knownAdulterants: [AdulterantSchema],
    knownSubstitutes: [SubstituteSchema],
    regionOfAvailability: [{ type: String, required: true }],
    imageUrl: { type: String, required: true },
    isPlaceholderData: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Plant: Model<IPlant> =
  mongoose.models.Plant || mongoose.model<IPlant>('Plant', PlantSchema);

export default Plant;
