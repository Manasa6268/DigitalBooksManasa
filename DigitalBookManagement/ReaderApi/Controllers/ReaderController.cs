using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReaderApi.Models;
using ReaderApi.Services;

namespace ReaderApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    
    public class ReaderController : ControllerBase
    {
        private readonly IReaderService _readerService;
        public ReaderController(IReaderService readerService)
        {
            _readerService = readerService;
        }
        /// <summary>
        /// Searches the books.
        /// </summary>
        /// <param name="BookId">The book identifier.</param>
        /// <param name="Category">The category.</param>
        /// <param name="AuthorId">The author identifier.</param>
        /// <param name="Publisher">The publisher.</param>
        /// <returns>ActionResult&lt;BooksDetails&gt;.</returns>
        [HttpGet]
        [Route("searchbook")]
        
        public ActionResult<List<BooksDetails>> SearchBooks(string? Title, string? AuthorName, string? Publisher,DateTime? RealeasedDate)
        {
            return _readerService.SearchBooks(Title, AuthorName, Publisher, RealeasedDate);
        }
        /// <summary>
        /// Gets the reader books.
        /// </summary>
        /// <param name="BookId">The book identifier.</param>
        /// <returns>ActionResult&lt;BooksDetails&gt;.</returns>
        [HttpGet]
        [Route("readbook")]
        
        public ActionResult<BooksDetails> GetReaderBooks(string BookId)
        {
            var books = _readerService.GetBooks(BookId);
            if (books == null)
                return NoContent();
            else
                return books;
        }
        [HttpGet]
        [Route("getalldetails")]

        public ActionResult<List<BookPayDetails>> GetAllDetails(int BookId,int userId)
        {
            var books = _readerService.GetAll(BookId,userId);
            if (books == null)
                return NoContent();
            else
                return books;
        }
        [HttpGet]
        [Route("getnotifications")]

        public ActionResult<List<NotificationDetails>> GetNotifications(int BookId)
        {
            var notifies = _readerService.GetNotifications(BookId);
            if (notifies == null)
                return NoContent();
            else
                return notifies;
        }
    }
}
