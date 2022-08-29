import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDetails } from 'src/app/models/book.model';
import { BookPayDetails } from 'src/app/models/bookpaid.model';
import { PaymentDetails } from 'src/app/models/payment.model';
import { ReaderService } from 'src/app/services/reader.service';
const pdfMake = require('pdfmake/build/pdfmake.js');
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';
import { NotificationDetails } from 'src/app/models/notification.model';

@Component({
  selector: 'app-readbooks',
  templateUrl: './readbooks.component.html',
  styleUrls: ['./readbooks.component.css']
})
export class ReadbooksComponent implements OnInit {
  id: any;
  readerid: any;
  bookpaydetails: BookPayDetails[] = []
  notifications: NotificationDetails[] = []
  books: BookDetails[] = [];
  payments: PaymentDetails[] = [];
  constructor(private router: Router, private activateroute: ActivatedRoute, private readerservice: ReaderService, private toaster: ToastrService, private paymentservice: PaymentService) { }
  ngOnInit(): void {
    this.id = this.activateroute.snapshot.params['bookId']
    this.readerid = this.activateroute.snapshot.params['userId']
    this.GetPaidbooks()
  }
  ClickMe() {
    this.router.navigate(["/search"]);
  }
  clickMe() {
    this.router.navigate(["/login"]);
  }
  clickabout() {
    this.router.navigate(["/aboutus"]);
  }
  clicksearch() {
    this.router.navigate(["/search"]);
  }
  ClickNotify() {
    this.readerservice.getnotifications(this.id)
      .subscribe(
        data => {
          this.notifications = data;
          if (this.notifications.length > 0) {
            this.toaster.success(this.notifications[0].msg);
          }
          else {
            this.toaster.error("No Notifications found");
          }
        })
  }
  GetPaidbooks() {
    this.readerservice.getpaiddetails(this.id, this.readerid)
      .subscribe(
        data => {
          this.bookpaydetails = data;
        })
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
                text: this.bookpaydetails[0].name,
                bold: true
              },

              { text: this.bookpaydetails[0].email },

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
              ...this.bookpaydetails.map(p => ([p.title + ' by ' + p.authorName, p.price, 1, (p.price * 1).toFixed(2)])),
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
            'Order can be return in max 10 days.',
            'Warrenty of the product will be subject to the manufacturer terms and conditions.',
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
  generatebooktoread(content: string, title: string, authorName: string) {
    let docDefinition = {
      content: [
        {
          text: title,
          fontSize: 20,
          bold: true,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'by ' + authorName,
          fontSize: 16,
          bold: true,
          alignment: 'center',

        },
        {
          text: content,
          fontSize: 20,

        }
      ]
    }

    pdfMake.createPdf(docDefinition).open();
  }
  readbooks(id: string, logo: string, name: string) {
    this.generatebooktoread(id, logo, name);
  }
  downlodinvoice(paymentid: string) {
    this.readerservice.getpaiddetails(this.id, this.readerid)
      .subscribe(
        data => {
          this.bookpaydetails = data;
          this.generatePDF(paymentid);
        })
  }
  askrefund(paymentId: string, paymentDate: Date) {
    this.paymentservice.askrefund(paymentId, paymentDate)
      .subscribe(
        data => {
          this.toaster.success("Your refund for payment with payment id :" + paymentId + " will be done shortly")
          this.GetPaidbooks();

        })

  }
}
