import { ITipoTripulantePersistence } from '../../dataschema/ITipoTripulantePersistence';
import mongoose from 'mongoose';

const TipoTripulanteSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    description: { type: String}
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ITipoTripulantePersistence & mongoose.Document>('TipoTripulante', TipoTripulanteSchema);
