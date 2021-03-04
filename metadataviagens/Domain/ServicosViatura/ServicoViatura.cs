using System;
using System.Collections.Generic;
using metadataviagens.Domain.BlocosTrabalho;
using metadataviagens.Domain.Viaturas;
using DDDSample1.Domain.Shared;
using metadataviagens.Domain.Shared;

namespace metadataviagens.Domain.ServicosViatura
{
    public class ServicoViatura  : Entity<ServicoViaturaId>, IAggregateRoot
    {
        public string nome { get; set; }
        public Cor cor { get; set; }
        public string depots { get; set; }
        public Viatura viatura { get; set; }
        public List<BlocoTrabalho> blocos { get; set; }

        public ServicoViatura()
        {   
        }

        private Boolean verificaServicoViatura(string nome, Cor cor, Viatura viatura, List<BlocoTrabalho> blocos)
        {
            if(nome == null || viatura==null || cor == null || blocos == null) {
                return false;
            }
            var tempo = (blocos[0].horaFim - blocos[0].horaFim);
            for (int i = 0; i < blocos.Count - 1; i++)
            {
                if (blocos[i].horaFim != blocos[i + 1].horaInicio)
                {
                    return false;
                }
                tempo += blocos[i + 1].horaFim - blocos[i + 1].horaInicio;
            }
            return tempo <= 14400;
        }
        
        public ServicoViatura(string nome, Cor cor, string depots, Viatura viatura, List<BlocoTrabalho> blocos)
        {
            if(!verificaServicoViatura(nome,cor,viatura,blocos)) {
                throw new BusinessRuleValidationException("Serviço de viatura inválido");
            }
            this.Id = new ServicoViaturaId(Guid.NewGuid());
            this.nome = nome;
            this.cor = cor;
            this.depots = depots;
            this.viatura = viatura;
            this.blocos = blocos;
        }
    }
}