using System.ComponentModel.DataAnnotations;

namespace ReaderApi.Models
{
    public class PaymentDetails
    {
        

        [Key]
        public string paymentId { get; set; }
        public string email { get; set; }
        
        public string name { get; set; }
        public int bookId { get; set; }
        public int userId { get; set; }
        public DateTime paymentDate { get; set; }= DateTime.Now;

    }
    public class UserDetails
    {
        [Key]
        
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string EmailId { get; set; }
        public string Password { get; set; }
        public string UserType { get; set; }


    }
    public class RefundDetails
    {
        public string paymentId { get; set; }
        public DateTime paymentDate { get; set; }
    }


}
