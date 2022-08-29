using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReaderApi.Models;
using ReaderApi.Services;

namespace ReaderApi.Controllers
{
    /// <exclude />
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
   

    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        /// <summary>
        /// Initializes a new instance of the <see cref="PaymentsController"/> class.
        /// </summary>
        /// <param name="paymentService">The payment service.</param>
        public PaymentsController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }
        /// <summary>
        /// Buys the book.
        /// </summary>
        /// <param name="paymentDetails">The payment details.</param>
        /// <returns>ActionResult&lt;System.String&gt;.</returns>
        [HttpPost]
        [Route("buybook")]
       
        public ActionResult<PaymentDetails> BuyBook(PaymentDetails paymentDetails)
        {
            return Ok(_paymentService.BuyBook(paymentDetails));
        }
        /// <summary>
        /// Asks the refund.
        /// </summary>
        /// <param name="paymentDetails">The payment details.</param>
        /// <returns>ActionResult&lt;System.String&gt;.</returns>
        [HttpPost]
        [Route("askrefund")]
      
        public ActionResult<string> AskRefund([FromBody]RefundDetails refundDetails)
        {
            return Ok(_paymentService.AskRefund(refundDetails));
        }
        /// <summary>
        /// Finds the books.
        /// </summary>
        /// <param name="paymentDetails">The payment details.</param>
        /// <returns>ActionResult&lt;BooksDetails&gt;.</returns>
        [HttpPost]
        [Route("findbooks")]
        
        public ActionResult<List<BooksDetails>> FindBooks(PaymentDetails paymentDetails)
        {
            return Ok(_paymentService.FindBooks(paymentDetails));
        }
        /// <summary>
        /// Finds all books.
        /// </summary>
        /// <param name="paymentDetails">The payment details.</param>
        /// <returns>ActionResult&lt;BooksDetails&gt;.</returns>
        [HttpGet]
        [Route("findallbooks")]
        
        public ActionResult<BooksDetails> FindAllBooks(PaymentDetails paymentDetails)
        {
            return Ok(_paymentService.FindAllBooks(paymentDetails));
        }
        [HttpGet]
        [Route("getallbooksbyId")]
        
        public ActionResult<BooksDetails> GetBooksOnBookId(int bookId)
        {
            try
            {
                var books = _paymentService.GetBooksOnBookId(bookId);
                if (books == null)
                    return NoContent();
                else
                    return books;
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("checkemail")]

        public ActionResult<int> checkemail(string emailid)
        {
            try
            {
                var msg = _paymentService.checkemail(emailid);
                if (msg == null)
                    return NoContent();
                else
                    return msg;
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
