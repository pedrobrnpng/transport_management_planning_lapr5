import { ITipoViaturaPersistence } from '../../dataschema/ITipoViaturaPersistence';
import mongoose from 'mongoose';

const TipoViaturaSchema = new mongoose.Schema(
  {
    domainId: {
      type: String,
      required: true,
      unique: true,
      minlength: 20,
      maxlength: 20
    },
    descricao: { 
        type: String
    },
    combustivel: {
      type: Number,
      required: true
    },
    autonomia: {
        type: Number,
        min: 0
    },
    velocidadeMedia: {
        type: Number,
        min: 0
    },
    custoKM: {
        valor: {type: Number, min: 0},
        moeda: {type: String, min: 3, max: 3}
    },
    consumoMedio: {
      type: Number,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ITipoViaturaPersistence & mongoose.Document>('TipoViatura', TipoViaturaSchema);
