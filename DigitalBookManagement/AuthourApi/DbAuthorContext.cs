using AuthourApi.Model;
using Microsoft.EntityFrameworkCore;

namespace AuthourApi
{
    public class DbAuthorContext : DbContext
    {
        private readonly IConfiguration _configuration;
        public DbSet<UserDetails> UserDetails { get; set; }
        public DbSet<BooksDetails> BooksDetails { get; set; }
        public DbSet<PaymentDetails> paymentDetails { get; set; }

        public DbSet<NotificationDetails> notificationDetails { get; set; }
        public DbAuthorContext(IConfiguration configuration)
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
            modelBuilder.Entity<UserDetails>().ToTable("tbl_Users");
            modelBuilder.Entity<BooksDetails>().ToTable("tbl_Books");
            modelBuilder.Entity<PaymentDetails>().ToTable("tbl_Payments");
            modelBuilder.Entity<NotificationDetails>().ToTable("tbl_Notifications");

        }
    }
}
