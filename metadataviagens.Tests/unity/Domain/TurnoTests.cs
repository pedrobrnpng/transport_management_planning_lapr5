using NUnit.Framework;
using metadataviagens.Domain.Tripulantes;
using DDDSample1.Domain.Shared;


namespace metadataviagens.Tests.Domain
{
    [TestFixture]
    public class TurnoTests
    {

        [Test]
        public void ShouldCreateTurno()
        {
            new Turno("diurno");
            new Turno("noturno");
        }

        [Test]
        public void ShouldNotCreateTurno()
        {
            Assert.That(() => new Turno("das"),
            Throws.TypeOf<BusinessRuleValidationException>());
        }

    }
}
