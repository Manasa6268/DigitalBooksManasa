using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyAzureFunction.Models
{
    public class DbPaymentContext : DbContext
    {
        public DbPaymentContext()
        {

        }
        public DbPaymentContext(DbContextOptions<DbPaymentContext> options)
            : base(options)
        {
        }
        public DbSet<PaymentDetails> PaymentDetails { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            if (!options.IsConfigured)
            {
                options.UseSqlServer("Data Source=CTSDOTNET660;Initial Catalog=DigitalBooksDb;user id=sa;password=pass@word1;");
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<PaymentDetails>().ToTable("tbl_Payments");

        }
    }
}
