using AuthourApi.Model;
using AuthourApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AuthourApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController] 
    
    public class AuthorController : ControllerBase
    {
        private readonly IAuthourService _authorService;
        private readonly IAccountsService _accountsService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public AuthorController(IAuthourService authorService, IAccountsService accountsService, IWebHostEnvironment webHostEnvironment)
        {
            _authorService = authorService;
            _accountsService = accountsService;
            _webHostEnvironment = webHostEnvironment;

        }

       /// <summary>
        /// Creates the account.
        /// </summary>
        /// <param name="userDetails">The user details.</param>
        /// <returns>ActionResult&lt;System.String&gt;.</returns>
        [HttpPost]
        [Route("signup")]
        public IActionResult CreateAccount([FromBody] UserDetails userDetails)
        {
            try
            {
                return Ok(_accountsService.CreateAccount(userDetails));
            }
            catch
            {
                return BadRequest();
            }
        }
        /// <summary>
        /// Check accounts the specified username.
        /// </summary>
        /// <param name="username">The username.</param>
        /// <param name="password">The password.</param>
        /// <returns>ActionResult&lt;System.String&gt;.</returns>
        [HttpPost]
        [Route("login")]
        [Authorize]
        public ActionResult<string> checksaccount([FromBody]UserLoginData userLoginData)
        {
            try 
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                UserClaims userClaims = VerifyUser(identity);
                if (userClaims.UserType == "author" && userClaims.UserName == userLoginData.UserName)
                {
                    return Ok(_accountsService.checkaccount(userLoginData));
                }
                else
                {
                    return "Login Unsuccessful";
                }
            }
            catch
            {
                return BadRequest();
            }
        }
        /// <summary>
        /// Creates the book.
        /// </summary>
        /// <param name="books">The books.</param>
        /// <returns>ActionResult&lt;BooksDetails&gt;.</returns>
        [HttpPost]
        [Route("createbook")]
        [Authorize]
        public ActionResult<string> CreateBook([FromBody] BooksDetails books)
        {
            try 
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                UserClaims userClaims = VerifyUser(identity);
                if (userClaims.UserType == "author")
                {
                    return _authorService.CreateBook(books);
                }
                else
                {
                    return "Only Author can create books";
                }

            }
            catch
            {
                return BadRequest();
            }
}
        /// <summary>
        /// Edits the book.
        /// </summary>
        /// <param name="bookId">The book identifier.</param>
        /// <param name="booksDetails">The books details.</param>
        /// <returns>ActionResult&lt;System.String&gt;.</returns>
        [HttpPut("editbook")]
        [Authorize]
        public ActionResult<string> EditBook([FromBody] BooksDetails booksDetails)
        {
            try 
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                UserClaims userClaims = VerifyUser(identity);
                if (userClaims.UserType == "author")
                {
                    return _authorService.EditBook(booksDetails);
                }
                else
                {
                    return "only author can edit the book";
                }
            }
            catch
            {
                return BadRequest();
            }
        }
        /// <summary>
        /// Blocks the unblock book.
        /// </summary>
        /// <param name="BookId">The book identifier.</param>
        /// <param name="status">if set to <c>true</c> [status].</param>
        /// <returns>ActionResult&lt;System.String&gt;.</returns>
       

        /// <summary>
        /// Gets the list of books.
        /// </summary>
        /// <param name="AuthorId">The author identifier.</param>
        /// <returns>ActionResult&lt;BooksDetails&gt;.</returns>
        [HttpGet]
        [Route("getallbooks")]
        [Authorize]
        public ActionResult<List<BooksDetails>> GetBooks(int AuthorId)
        {
            try 
            { 
            var books = _authorService.GetBooks(AuthorId);
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
        [Route("getallbooksbyId")]
        [Authorize]
        public ActionResult<BooksDetails> GetBooksOnBookId(int bookId)
        {
            try
            {
                var books = _authorService.GetBooksOnBookId(bookId);
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
        [HttpDelete]
        [Route("deletebook")]
        [Authorize]

        public ActionResult<string> DeleteBook(int BookId)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                UserClaims userClaims = VerifyUser(identity);
                if (userClaims.UserType == "author")
                {
                    return _authorService.DeleteBook(BookId);
                }
                else
                {
                    return "only author can block or unblock the book";
                }
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("blockbook")]
        [Authorize]
        public ActionResult<string> BlockBook([FromBody]BlockDetails blockDetails)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                UserClaims userClaims = VerifyUser(identity);
                if (userClaims.UserType == "author")
                {
                    return _authorService.BlockUnblockBook(blockDetails);
                }
                else
                {
                    return "only author can block or unblock the book";
                }
            }
            catch
            {
                return BadRequest();
            }
        }
        private UserClaims VerifyUser(ClaimsIdentity identity)
        {
            UserClaims userClaims = new UserClaims();
            userClaims.UserName = identity.FindFirst("UserName").Value.ToString();
            //userClaims.EmailId = identity.FindFirst("EmailId").Value.ToString();
            userClaims.UserType= identity.FindFirst("UserType").Value.ToString();
            return userClaims;
        }
        
    }
}
