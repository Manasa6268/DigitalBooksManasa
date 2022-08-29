import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookDetails } from '../models/book.model';
import { PaymentDetails } from '../models/payment.model';
import { url } from '../models/url.model';
@Injectable({ providedIn: 'root' })
export class PaymentService {
    public apiUrl:string;
    constructor(private http: HttpClient) {    
      this.apiUrl=url;
    }
getAllBooksbyId(BookId:number):Observable<BookDetails>{     
    return this.http.get<BookDetails>(this.apiUrl+'/payments/getallbooksbyId?bookId='+BookId); 
}
buybook(payment:PaymentDetails ):Observable<PaymentDetails> { 
    return this.http.post<any>(`${this.apiUrl}/payments/buybook`,{
        "paymentId": payment.paymentId,
        "email": payment.email,
        "name": payment.name,
        "userId":payment.userId,
        "bookId": payment.bookId,
        "paymentDate": payment.paymentDate
      })
}
askrefund(paymentId:string,paymentDate:Date):Observable<PaymentDetails>{
  return this.http.post<any>(`${this.apiUrl}/payments/askrefund`,{paymentId: paymentId,paymentDate: paymentDate });
}
getpaiddetails(payment: string):Observable<PaymentDetails> {
    return this.http.get<PaymentDetails>(this.apiUrl+'/payments/getpaymentdetails?paymentId='+payment);
  }
  checkmail(email: string |null) {
    return this.http.get<any>(this.apiUrl+'/payments/checkmail?emailid='+email);
  }
}