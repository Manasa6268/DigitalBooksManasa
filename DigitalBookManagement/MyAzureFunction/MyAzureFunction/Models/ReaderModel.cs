using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyAzureFunction.Models
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
