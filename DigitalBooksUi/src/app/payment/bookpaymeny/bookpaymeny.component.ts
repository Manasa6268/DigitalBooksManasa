import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserCredentials } from 'src/app/models/user.model';
const pdfMake = require('pdfmake/build/pdfmake.js');
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { PaymentService } from 'src/app/services/payment.service';
import { BookDetails } from 'src/app/models/book.model';
import { PaymentDetails } from 'src/app/models/payment.model';
import { ToastrService } from 'ngx-toastr';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-bookpaymeny',
  templateUrl: './bookpaymeny.component.html',
  styleUrls: ['./bookpaymeny.component.css']
})
export class BookpaymenyComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string = '';
  message: string | null = "";
  btnhide = true;
  id: number = 0;
  inc: number = 0;
  cred: UserCredentials = {
    userName: '',
    password: ''
  };
  books: BookDetails[] = [];
  book: BookDetails = {
    bookId: 0,
    logo: '',
    title: '',
    category: '',
    price: 0,
    authorId: 0,
    authorName: '',
    publisher: '',
    publishDate: new Date(),
    content: '',
    active: 0,
    createdDate: new Date(),
    modifiedDate: new Date()
  }
  payment: PaymentDetails = {
    paymentId: '',
    email: '',
    name: '',
    userId: 0,
    bookId: 0,
    paymentDate: new Date()
  }
  constructor(private paymentservice: PaymentService, private router: Router, private formBuilder: FormBuilder, private activatedroute: ActivatedRoute, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.id = this.activatedroute.snapshot.params['bookId'];
    this.GetbookbyId();
  }
  generatePDF(paymentforinvoice: string) {
    let docDefinition = {
      content: [
        {
          text: 'LIBUNO',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'INVOICE',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue'
        },
        // Previous configuration  
        {
          text: 'Customer Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: this.payment.name,
                bold: true
              },

              { text: this.payment.email },

            ],
            [
              {
                text: `Date: ${new Date().toLocaleString()}`,
                alignment: 'right'
              },
              {
                text: `Bill No :` + paymentforinvoice,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Order Details',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Product', 'Price', 'Quantity', 'Amount'],
              ...this.books.map(p => ([p.title + ' by ' + p.authorName, p.price, 1, (p.price * 1).toFixed(2)])),
              [{ text: 'Total Amount', colSpan: 3 }, {}, {}, this.books.reduce((sum, p) => sum + (1 * p.price), 0).toFixed(2)]
            ]
          }
        },
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader'

        },
        {

          ul: [
            'Order can be return in max 24 hours.',
            'This is system generated invoice.',
          ],
        }
      ],

      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        }
      },
    }

    pdfMake.createPdf(docDefinition).open();
  }
  onChangeEvent(event: any) {
    this.paymentservice.checkmail(event.target.value)
      .subscribe(
        data => {
          if (data == 0) {
            this.btnhide = true;
            localStorage.setItem('emailid', data);
          }
          else {
            this.btnhide = false;
          }
        }
      );
  }
  onSubmit(id: number) {
    this.payment.bookId = this.id;
    this.inc = this.payment.userId;
    this.paymentservice.buybook(this.payment)
      .subscribe(
        data => {
          if (data.paymentId != null) {
            this.generatePDF(data.paymentId)

            this.toaster.success('Payment Successfull with Recepit id' + data.paymentId + 'for book' + this.book.title + ' written by ' + this.book.authorName)

            this.router.navigate(['/readbooks', id, data.userId]);
          }
          else {
            this.toaster.error('Payment already Completed!')
          }
        },
        error => {
          console.log(error);
          this.loading = false;
        });

  }
  GetbookbyId() {
    this.paymentservice.getAllBooksbyId(this.id)
      .subscribe(
        data => {
          this.book = data;
          this.books[0] = data;
        })

  }
  generateinvoice(id: string) {
    this.paymentservice.getpaiddetails(id)
      .subscribe(
        data => {
          this.payment = data;
          this.generatePDF(id);
        })
  }
  viewhistory(emailid: string) {

    this.paymentservice.checkmail(emailid)
      .subscribe(
        data => {
          this.router.navigate(['/readbooks', this.id, data]);

        });
  }
}
