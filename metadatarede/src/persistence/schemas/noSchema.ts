import { INoPersistence } from '../../dataschema/INoPersistence';
import mongoose from 'mongoose';

const NoSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    xCoordinate: { type: Number, max:90, min:-90 , required: true }, 
    yCoordinate: {type: Number, max:180, min:-180 , required: true},
    modelo: {type: String}
  },
  {
    timestamps: true
  }
);

export default mongoose.model<INoPersistence & mongoose.Document>('No', NoSchema);
