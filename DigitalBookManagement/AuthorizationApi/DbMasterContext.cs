using AuthorizationApi.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthorizationApi
{
    public class DbMasterContext : DbContext
    {
        private readonly IConfiguration _configuration;
        public DbSet<UserDetails> UserDetails { get; set; }
        
        public DbMasterContext(IConfiguration configuration)
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
           
        }
    }
}
