using ReaderApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace ReaderApi
{
    public class DbReaderContext : DbContext
    {
        private readonly IConfiguration _configuration;
       
        public DbSet<BooksDetails> BooksDetails { get; set; }
        public DbSet<PaymentDetails> PaymentDetails { get; set; }
         
        public DbSet<BookPayDetails> BookPayDetails { get; set; }
        public DbSet<UserDetails> userDetails { get; set; }

        public DbSet<NotificationDetails> notificationDetails { get; set; }
        public DbReaderContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            if (!options.IsConfigured)
            {
                options.UseSqlServer(_configuration.GetConnectionString("ConnectionString"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<BooksDetails>().ToTable("tbl_Books");
            modelBuilder.Entity<PaymentDetails>().ToTable("tbl_Payments");
            modelBuilder.Entity<UserDetails>().ToTable("tbl_Users");
            modelBuilder.Entity<NotificationDetails>().ToTable("tbl_Notifications");



        }
    }
}
