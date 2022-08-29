using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using ReaderApi.Models;
using System.Diagnostics;
using System.Net;


namespace ReaderApi.Services
{
    public class ReaderService : IReaderService
    {
        private readonly DbReaderContext _DbMasterContext;
        public ReaderService(DbReaderContext dbMasterContext)
        {
            _DbMasterContext = dbMasterContext;
        }

        public BooksDetails GetBooks(string bookId)
        {
            try
            {

                return _DbMasterContext.BooksDetails.Find(bookId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);

            }
        }

       
        public List<BooksDetails> SearchBooks(string? Title, string? AuthorName, string? Publisher, DateTime? RealeasedDate)
        {
            try
            {
                
                //var list = _DbMasterContext.BooksDetails.ToList();
                if (Publisher != null && AuthorName != null && Title != null)
                {
                    var books = from c in _DbMasterContext.BooksDetails
                                where c.Title.Contains(Title)
                                where c.AuthorName.Contains(AuthorName)
                                where c.Publisher.Contains(Publisher)
                                where c.Active==1
                                select c;
                    List<BooksDetails> tbl = books.ToList();
                    return tbl;
                }
                else if (AuthorName != null && Title != null)
                {
                    var books = from c in _DbMasterContext.BooksDetails
                                where c.Title.Contains(Title)
                                where c.AuthorName.Contains(AuthorName)
                                where c.Active == 1
                                select c;
                    List<BooksDetails> tbl = books.ToList();
                    return tbl;
                }
                else if (Publisher != null && AuthorName != null)
                {
                    var books = from c in _DbMasterContext.BooksDetails
                                where c.Publisher.Contains(Publisher)
                                where c.AuthorName.Contains(AuthorName)
                                where c.Active == 1
                                select c;
                    List<BooksDetails> tbl = books.ToList();
                    return tbl;
                }
                else if (Publisher != null && Title !=null)
                {
                    var books = from c in _DbMasterContext.BooksDetails
                                where c.Publisher.Contains(Publisher)
                                where c.Title.Contains(Title)
                                where c.Active == 1
                                select c;
                    List<BooksDetails> tbl = books.ToList();
                    return tbl;
                }
                else if (Publisher != null)
                {
                    var books = from c in _DbMasterContext.BooksDetails
                                where c.Publisher.Contains(Publisher)
                                where c.Active == 1
                                select c;
                    List<BooksDetails> tbl = books.ToList();
                    return tbl;
                }
                else if (AuthorName != null)
                {
                    var books = from c in _DbMasterContext.BooksDetails
                                where c.AuthorName.Contains(AuthorName)
                                where c.Active==1
                                select c;
                    List<BooksDetails> tbl = books.ToList();
                    return tbl;
                }
                else
                {
                    //List<BooksDetails> tbl = _DbMasterContext.BooksDetails.Where(x => x.Title == Title).ToList();
                    var books = from c in _DbMasterContext.BooksDetails
                                    where c.Title.Contains(Title)
                                where c.Active == 1
                                select c;
                    List<BooksDetails> tbl = books.ToList();
                 
                    return tbl;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public List<BookPayDetails> GetAll(int BookId,int UserId)
        {
            
            string sql = "EXEC [dbo].[getmybooks] @userId";
            List<SqlParameter> parms = new List<SqlParameter>
    {
        // Create parameter(s)    
        new SqlParameter { ParameterName = "@userId", Value = UserId },
        
    };

            List<BookPayDetails> list = _DbMasterContext.BookPayDetails.FromSqlRaw<BookPayDetails>(sql, parms.ToArray()).ToList();
 
 
            return list;
            
        }

        public List<NotificationDetails> GetNotifications(int bookId)
        {
            
            var books = from c in _DbMasterContext.notificationDetails
                        where c.bookId == bookId
                        select c;
            List<NotificationDetails> tbl = books.ToList();

            return tbl;
        }
    }
}
