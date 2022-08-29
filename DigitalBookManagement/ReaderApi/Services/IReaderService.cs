using ReaderApi.Models;

namespace ReaderApi.Services
{
    public interface IReaderService
    {
      public  BooksDetails GetBooks(string bookId);
      public List<BooksDetails> SearchBooks(string? Title, string? AuthorName, string? Publisher, DateTime? RealeasedDate);
        public List<NotificationDetails> GetNotifications(int bookId);
        public List<BookPayDetails> GetAll(int BookId, int UserId);
    }
}