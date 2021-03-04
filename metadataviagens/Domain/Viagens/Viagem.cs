using System;
using DDDSample1.Domain.Shared;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace metadataviagens.Domain.Viagens
{
    public class Viagem : Entity<ViagemId>, IAggregateRoot
    {
        public int codigo { get; set; }
        public DateTime horaInicio { get; private set; }
        public string linha { get; private set; }
        public string idPercurso{ get; private set; }

        private Viagem()
        {
        }

        public Viagem(int codigo, DateTime horaInicio, LinhaId linha, PercursoId idPercurso)
        {
            this.Id = new ViagemId(Guid.NewGuid());
            this.codigo = codigo;
            setHoraInicio(horaInicio);
            setLinha(linha);
            setIdPercurso(idPercurso);
        }

        private void setLinha(LinhaId linha){
            if (linha is null){
                throw new BusinessRuleValidationException("linha não pode ser null");
            }
            this.linha = linha.id;
        }

        private void setIdPercurso(PercursoId idPercurso){
            if (idPercurso is null){
                throw new BusinessRuleValidationException("percurso não pode ser null");
            }
            this.idPercurso = idPercurso.id;
        }

        private void setHoraInicio(DateTime horaInicio){
            if (horaInicio < DateTime.Now){
                throw new BusinessRuleValidationException("hora inicio não pode ser inferior ao momento atual");
            } 
            this.horaInicio = horaInicio;
        }
        public int horaInicioAsInt() {
            return this.horaInicio.Hour*3600+this.horaInicio.Minute*60+this.horaInicio.Second;
        } 
    }
}