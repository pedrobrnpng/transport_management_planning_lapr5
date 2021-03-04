using System;
using metadataviagens.Domain.Tripulantes;
using DDDSample1.Domain.Shared;
using metadataviagens.Domain.Shared;
using System.Collections.Generic;
using metadataviagens.Domain.BlocosTrabalho;

namespace metadataviagens.Domain.ServicosTripulante
{
    public class ServicoTripulante : Entity<ServicoTripulanteId>, IAggregateRoot
    {

        public Tripulante tripulante { get; set; }
        public string nome { get; set; }
        public Cor cor { get; set; }
        public List<BlocoTrabalho> blocosTrabalho { get; private set; }
        public bool Active { get; private set; }

        public ServicoTripulante()
        {
            this.Active = true;
        }

        private Boolean verificarBlocosTrabalho(List<BlocoTrabalho> blocosTrabalho, int tempo)
        {
            for (var i = 0; i < blocosTrabalho.Count - 1; i++)
            {
                if (blocosTrabalho[i].horaFim != blocosTrabalho[i + 1].horaInicio)
                {
                    if (blocosTrabalho[i].horaFim > blocosTrabalho[i + 1].horaInicio)
                    {
                        return false;
                    }
                    else
                    {
                        return this.verificarBlocosTrabalho2(blocosTrabalho.GetRange(i + 1, blocosTrabalho.Count - (i + 1)), blocosTrabalho[i + 1].horaFim - blocosTrabalho[i + 1].horaInicio);
                    }
                }
                tempo += blocosTrabalho[i + 1].horaFim - blocosTrabalho[i + 1].horaInicio;
            }
            if (tempo > 14400)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        private Boolean verificarBlocosTrabalho2(List<BlocoTrabalho> blocosTrabalho, int tempo)
        {
            for (var i = 0; i < blocosTrabalho.Count - 1; i++)
            {
                if (blocosTrabalho[i].horaFim != blocosTrabalho[i + 1].horaInicio)
                {
                    return false;
                }
                tempo += blocosTrabalho[i + 1].horaFim - blocosTrabalho[i + 1].horaInicio;
            }
            if (tempo > 14400)
            {
                return false;
            }
            else
            {
                return true;
            }
        }


        private Boolean verificaServicoTripulante(Tripulante tripulante, string nome, Cor cor, List<BlocoTrabalho> blocosTrabalho)
        {
            if (nome == null || tripulante == null || cor == null || blocosTrabalho == null)
            {
                return false;
            }
            var tempo = (blocosTrabalho[0].horaFim - blocosTrabalho[0].horaInicio);
            return this.verificarBlocosTrabalho(blocosTrabalho, tempo);
        }

        public ServicoTripulante(Tripulante tripulante, string nome, Cor cor, List<BlocoTrabalho> blocosTrabalho)
        {
            if (!verificaServicoTripulante(tripulante, nome, cor, blocosTrabalho))
            {
                throw new BusinessRuleValidationException("Blocos de trabalho especificados não podem ser atribuidos a este tripulante");
            }
            this.Id = new ServicoTripulanteId(Guid.NewGuid());
            this.tripulante = tripulante;
            this.nome = nome;
            this.cor = cor;
            this.blocosTrabalho = blocosTrabalho;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}