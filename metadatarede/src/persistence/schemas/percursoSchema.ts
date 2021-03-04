import { IPercursoPersistence } from '../../dataschema/IPercursoPersistence';
import mongoose from 'mongoose';

const PercursoSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    segmentosRede: [{
        domainId: {type: String},
        idNoInicio:  { type: String},
        idNoFim:  { type: String},
        distancia: {
            value: { type: Number },
            unidadeDistancia: { type: String }
        },
        tempoViagem: {
            value: { type: Number},
            unidadeTempo: { type: String }
        },
        sequencia: {type: Number}
    }],
    idLinha: { type: String},
    direcao: { type: String}
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IPercursoPersistence & mongoose.Document>('Percurso', PercursoSchema);
