using System;

namespace metadataviagens.Domain.Shared
{
    public class DateTimeDto
    {
        public DateTime date { get; set; }

        public DateTimeDto(DateTime date)
        {
            this.date = date;
        }
    }
}