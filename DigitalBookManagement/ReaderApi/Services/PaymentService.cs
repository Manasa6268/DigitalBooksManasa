using ReaderApi.Models;
using System;
using System.Net;


namespace ReaderApi.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly DbReaderContext _DbMasterContext;
        public PaymentService(DbReaderContext dbMasterContext)
        {
            _DbMasterContext = dbMasterContext;
        }
        public string AskRefund(RefundDetails refundDetails)
        {
            
            if (refundDetails.paymentDate > DateTime.Now.AddHours(-24) && refundDetails.paymentDate <= DateTime.Now)
            {
                var existingCard = _DbMasterContext.PaymentDetails.FirstOrDefault(x => x.paymentId == refundDetails.paymentId);
                _DbMasterContext.Remove(existingCard);
                _DbMasterContext.SaveChanges();
                 return "Refund Successfull";
                

            }
            else
            {
                return "Refund not Possible as payment done on"+ refundDetails.paymentDate + "current date is"+DateTime.Now;
            } 
        }
        public string UpdatePayment(PaymentDetails paymentDetails)
        {
            try
            {
                var list = _DbMasterContext.PaymentDetails.ToList();
                foreach (var u in list)
                {
                    int index = list.FindIndex(s => s.paymentId == paymentDetails.paymentId);
                    list[index].email = paymentDetails.email;
                    list[index].name = paymentDetails.name;
                    list[index].bookId = paymentDetails.bookId;
                    list[index].paymentDate = paymentDetails.paymentDate;
                    _DbMasterContext.SaveChanges();
                }
                return "Payment details updated successfully";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        private static Random random = new Random();

        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
        public PaymentDetails BuyBook(PaymentDetails paymentDetails)
        
        
        
       {
            try
            {
                PaymentDetails payment = new PaymentDetails();
                List<UserDetails> userDetails = _DbMasterContext.userDetails.Where(x => x.UserName == paymentDetails.name && x.EmailId == paymentDetails.email).ToList();
                if (userDetails.Count == 0)
                {
                    UserDetails user = new UserDetails
                    {
                        UserName = paymentDetails.name,
                        EmailId = paymentDetails.email,
                        Password = "password",
                        UserType = "reader",
                    };


                    _DbMasterContext.userDetails.Add(user);
                    _DbMasterContext.SaveChanges();
                }

                    UserDetails users = _DbMasterContext.userDetails.Where(x => x.UserName == paymentDetails.name && x.EmailId == paymentDetails.email).First();
                    List<PaymentDetails> payments = _DbMasterContext.PaymentDetails.Where(x => x.bookId == paymentDetails.bookId && x.email == paymentDetails.email).ToList();
                    if (payments.Count == 0)
                    {

                    payment.paymentId = RandomString(8);
                    payment.email = paymentDetails.email;
                    payment.name = paymentDetails.name;
                    payment.userId = users.UserId;
                    payment.bookId = paymentDetails.bookId;
                    payment.paymentDate = DateTime.UtcNow;
                     _DbMasterContext.PaymentDetails.Add(payment);
                      _DbMasterContext.SaveChanges();
                        
                    }
                    return payment;
                




               
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);

            }
        }

        public List<BooksDetails> FindAllBooks(PaymentDetails paymentDetails)
        {
            try
            {
                List<BooksDetails> tbl = _DbMasterContext.BooksDetails.Where(e => e.BookId == paymentDetails.bookId).ToList();
                return tbl;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public BooksDetails FindBooks(PaymentDetails paymentDetails)
        {
            throw new NotImplementedException();
        }

        public BooksDetails GetBooksOnBookId(int bookId)
        {
            try
            {
                return _DbMasterContext.BooksDetails.Where(book => book.BookId == bookId).FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);

            }
        }

        public int checkemail(string emailid)
        {
            try
            {
                int books = _DbMasterContext.PaymentDetails.Where(book => book.email == emailid).Count();
                if (books == 0)
                {
                    return 0;
                }
                else
                {
                    UserDetails userDetails= _DbMasterContext.userDetails.Where(book => book.EmailId == emailid && book.UserType=="reader").FirstOrDefault();
                    if (userDetails != null)
                        return userDetails.UserId;
                    else
                        return -1;
                    
                }
            } 
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            
           
        }
    }
    


       
    }


