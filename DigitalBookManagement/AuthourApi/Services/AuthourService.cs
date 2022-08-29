using AuthourApi.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace AuthourApi.Services
{
    public class AuthourService : IAuthourService
    {
        private readonly DbAuthorContext _DbMasterContext;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public AuthourService(DbAuthorContext dbMasterContext, IWebHostEnvironment webHostEnvironment)
        {
            _DbMasterContext = dbMasterContext;
            _webHostEnvironment = webHostEnvironment;
        }

        public string CreateBook(BooksDetails booksDetails)
        {
            try
            {
                //string filename = UploadedFile(booksDetails);
                BooksDetails books =new BooksDetails
                { 
                
                logo = booksDetails.logo,
                title = booksDetails.title,
                category = booksDetails.category,
                price = booksDetails.price,
                authorId = booksDetails.authorId,
                publisher = booksDetails.publisher,
                publishDate = DateTime.UtcNow,
                content = booksDetails.content,
                active = booksDetails.active,
                modifiedDate = DateTime.UtcNow,
                createdDate=DateTime.UtcNow,
            };
                _DbMasterContext.BooksDetails.Add(booksDetails);
            _DbMasterContext.SaveChanges();
            return "Book added Successfully";
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);

            }
        }
      

        public string EditBook( BooksDetails booksDetails)
        {
            try
            { 
            var book = _DbMasterContext.BooksDetails
                .FirstOrDefault(s => s.bookId.Equals(booksDetails.bookId));

           
            book.logo = booksDetails.logo;
            book.title = booksDetails.title;
            book.category = booksDetails.category;
            book.price = booksDetails.price;
            book.authorId = booksDetails.authorId;
            book.authorName = booksDetails.authorName;
            book.publisher = booksDetails.publisher;
            book.publishDate = DateTime.UtcNow;
            book.content = booksDetails.content;
            book.active = booksDetails.active;
            book.modifiedDate = DateTime.UtcNow;
            book.createdDate = DateTime.UtcNow;
            _DbMasterContext.SaveChanges();

            return "Books details Updated Successfully";
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);

            }
        }
        public string BlockUnblockBook(BlockDetails blockDetails)
        {
            try
            {
                
                var book = _DbMasterContext.BooksDetails.Find(blockDetails.BookId);
                
                if (book != null)
                {
                    book.active = blockDetails.status;
                    _DbMasterContext.BooksDetails.Update(book);
                    var payment = _DbMasterContext.paymentDetails.Where(payment => payment.bookId == blockDetails.BookId).FirstOrDefault();
                    if (payment != null)
                    {
                        _DbMasterContext.paymentDetails.Remove(payment);
                    }
                    NotificationDetails notifies = new NotificationDetails();
                    notifies.status = blockDetails.status;
                    notifies.bookId = blockDetails.BookId;
                    notifies.msg = "The book you purchased with title " + book.title + " has been blocked by author";
                    _DbMasterContext.notificationDetails.Add(notifies);
                    _DbMasterContext.SaveChanges();
                    return "Book Blocked or Unblocked Succesfully";
                  }
                else
                {
                    return "Book not Found";
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);

            }
        }
        public List<BooksDetails> GetBooks(int authourId)
        {
            try
            {
                return _DbMasterContext.BooksDetails.Where(book=>book.authorId==authourId).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);

            }
        }
        public BooksDetails GetBooksOnBookId(int bookId)
        {
            try
            {
                return _DbMasterContext.BooksDetails.Where(book => book.bookId == bookId).FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);

            }
        }

        public ActionResult<string> DeleteBook(int bookId)
        {
            try
            {

                var existingCard = _DbMasterContext.BooksDetails.FirstOrDefault(x => x.bookId == bookId);
                if (existingCard != null)
                {

                    _DbMasterContext.Remove(existingCard);
                    _DbMasterContext.SaveChangesAsync();
                    return "Book Deleted Successfully";
                }
                else
                {
                    return "Book not found";
                }
            }
            catch
              (Exception ex)
            {
                throw new Exception(ex.Message);

            }
           
            
        }
        public string UpdateLogo(IFormFile formFile)
        {
            string uniqueFileName = null;

            if (formFile != null)
            {
                string uploadsFolder = Path.Combine(_webHostEnvironment.ContentRootPath, "images");
                uniqueFileName = Guid.NewGuid().ToString() + "_" + formFile.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    formFile.CopyTo(fileStream);
                }
            }
            return uniqueFileName;
        }
        
    }
    public class AccountsService : IAccountsService
    {
        private readonly DbAuthorContext _DbMasterContext;
        public AccountsService(DbAuthorContext dbMasterContext)
        {
            _DbMasterContext = dbMasterContext;
        }

        public string CreateAccount(UserDetails userDetails)
        {
            try
            {
                
                _DbMasterContext.Add(userDetails);
                _DbMasterContext.SaveChanges();
                return "Account Successfully Created";
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);

            }
        }
       
        public List<UserDetails> ValidateAccount(string? userName, string? password)
        {
            try { 
            var status = _DbMasterContext.UserDetails.Where(x => x.UserName == userName && x.Password == password).First();
            if (status != null)
            {
                return _DbMasterContext.UserDetails.ToList();
            }
            else
            {
                return null;
            }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);

            }

        }


        public string checkaccount(UserLoginData userLoginData)
        {
            try { 
            var status = _DbMasterContext.UserDetails.Where(x => x.UserName == userLoginData.UserName && x.Password == userLoginData.Password).FirstOrDefault();
            if (status != null)
            {
                return "Account Successfully loggedin";
            }
            else
            {
                return "Please enter vaild login credentials";
            }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);

            }
        }
    }
}
