using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using MyAzureFunction.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Runtime.Intrinsics.Arm;

namespace MyAzureFunction
{ 

    public  class Function1
    {
        private readonly DbPaymentContext _paymentContext;
        public Function1(DbPaymentContext paymentContext)
        {
            _paymentContext = paymentContext ?? throw new ArgumentNullException(nameof(paymentContext));
        }

        [FunctionName("Function1")]
        public  async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {

            try
            {
                log.LogInformation("C# HTTP trigger function processed a request.");

                string responseMessage = "";

                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                dynamic data = JsonConvert.DeserializeObject(requestBody);
                Randomstring randomstring = new Randomstring();
                
                //name = name ?? data?.name;
                if (requestBody != null)
                {
                    var payment = new PaymentDetails();
                    payment.name = data.name;
                    payment.paymentId = randomstring.RandomString(8);
                    payment.paymentDate = DateTime.Now;
                    payment.bookId=data.bookId;
                    payment.email= data.email;
                    payment.userId =data.userId;
                    _paymentContext.PaymentDetails.Add(payment);
                    _paymentContext.SaveChanges();

                    responseMessage = "Inserted Payment successfully";
                    return new OkObjectResult(responseMessage);
                }
                responseMessage = "Some Issue occurred";

                return new OkObjectResult(responseMessage);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }
    }
}
