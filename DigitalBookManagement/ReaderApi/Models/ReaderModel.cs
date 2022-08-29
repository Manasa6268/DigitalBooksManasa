using System.ComponentModel.DataAnnotations;

namespace ReaderApi.Models
{
	public class BooksDetails
	{
	
		[Key]
		public int BookId { get; set; }
		public string Logo { get; set; }
		public string Title { get; set; }
		public string Category { get; set; }
		public decimal Price { get; set; }
		public int AuthorId { get; set; }
		public string AuthorName { get; set; }

        public string Publisher { get; set; }

		public DateTime PublishDate { get; set; }

		public string Content { get; set; }

		public int Active { get; set; }

		public DateTime CreatedDate { get; set; }

		public DateTime ModifiedDate { get; set; }

	}
	public class BookPayDetails
	{
		[Key]
		public int bookId { get; set; }

        public string title { get; set; }
		public string authorName { get; set; }
        public string content { get; set; }
        public decimal price { get; set; }
        public string paymentId { get; set; }
        public DateTime paymentDate { get; set; }
        public string name { get; set; }

		public string email { get; set; }

		public string logo { get; set; }


    }

    public class NotificationDetails
    {
        [Key]
        public int id { get; set; }
        public int bookId { get; set; }
        public int status { get; set; }

        public string msg { get; set; }
    }
}
