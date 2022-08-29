using AuthourApi.Model;
using Microsoft.AspNetCore.Mvc;

namespace AuthourApi.Services
{
    public interface IAuthourService
    {
       public string BlockUnblockBook(BlockDetails blockDetails);
        public string CreateBook(BooksDetails books);
        ActionResult<string> DeleteBook(int bookId);
        public string EditBook(BooksDetails booksDetails);
        public List<BooksDetails> GetBooks(int authourId);
        public BooksDetails GetBooksOnBookId(int authourId);

        public string UpdateLogo(IFormFile formFile);
    }
}