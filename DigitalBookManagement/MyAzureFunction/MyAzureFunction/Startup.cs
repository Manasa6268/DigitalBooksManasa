
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MyAzureFunction.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

[assembly: FunctionsStartup(typeof(MyAzureFunction.Startup))]
namespace MyAzureFunction
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            string connectionString = Environment.GetEnvironmentVariable("connection");
            builder.Services.AddDbContext<DbPaymentContext>(
                options => SqlServerDbContextOptionsExtensions.UseSqlServer(options, connectionString));
        }
    }
}
