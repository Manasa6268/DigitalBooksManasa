using ReaderApi.Models;

namespace ReaderApi.Services
{
    public interface IPaymentService
    {
        string AskRefund(RefundDetails refundDetails);
        PaymentDetails BuyBook(PaymentDetails paymentDetails);
        int checkemail(string emailid);
        List<BooksDetails> FindAllBooks(PaymentDetails paymentDetails);
        BooksDetails FindBooks(PaymentDetails paymentDetails);
        BooksDetails GetBooksOnBookId(int bookId);
    }
}