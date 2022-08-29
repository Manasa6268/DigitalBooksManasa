using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Claims;

namespace AuthourApi.Model
{
	public class BooksDetails
	{
		[Key]
		[Required]
        public int bookId { get; set; }
		public string logo { get; set; }
		public string title { get; set; }
		public string category { get; set; }
		public decimal price { get; set; }
		public int authorId { get; set; }

		public string publisher { get; set; }

		public DateTime publishDate { get; set; }

		public string content { get; set; }

		public int active { get; set; }

		public DateTime createdDate { get; set; }

		public DateTime modifiedDate { get; set; }
        public string authorName { get; set; }

		

    }
	public class UserDetails
	{
		[Key]
		[Required]
        public int UserId { get; set; }
		public string UserName { get; set; }
		public string EmailId { get; set; }
		public string Password { get; set; }
		public string UserType { get; set; }

		public UserDetails(int userId, string userName, string emailId, string password, string userType)
		{
			UserId = userId;
			UserName = userName;
			EmailId = emailId;
			Password = password;
			UserType = userType;
		}
	}
	public class UserClaims
	{
		
		public string UserName { get; set; }
		public string EmailId { get; set; }
		
		public string UserType { get; set; }

		
	}
    public class UserLoginData
	{
		public string UserName { get; set; }
        public string Password { get; set; }
	}

	public class BlockDetails
	{
        public int BookId { get; set; }
        public int status { get; set; }
	}
	public class NotificationDetails
	{
		[Key]
		public int id { get; set; }
        public int bookId { get; set; }
        public int status { get; set; }

        public string msg { get; set; }
    }

    public class PaymentDetails
    {


        [Key]
        public string paymentId { get; set; }
        public string email { get; set; }

        public string name { get; set; }
        public int bookId { get; set; }
        public int userId { get; set; }
        public DateTime paymentDate { get; set; } = DateTime.Now;

    }
}
