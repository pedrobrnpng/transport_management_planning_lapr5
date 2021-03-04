import { ILinhaPersistence } from '../../dataschema/ILinhaPersistence';
import mongoose from 'mongoose';

const Linha = new mongoose.Schema({
    domainId: { 
        type: String, 
        unique: true,
        maxlength: 1,
        minlength: 1,
        required: true, },
    noInicial: {
        type: String,
        required: true
    },
    noFinal: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        minlength: 5,
        maxlength: 20,
        required: true, 
        unique: true
    },
    idTiposTripulante: [String],
    idTiposViatura: [String],
    cor: {
        type: String,
        required: true,
        unique: true
    }

});

export default mongoose.model<ILinhaPersistence & mongoose.Document>('Linha',Linha);