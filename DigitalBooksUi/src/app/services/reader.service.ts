import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookDetails } from '../models/book.model';
import { BookPayDetails } from '../models/bookpaid.model';
import { NotificationDetails } from '../models/notification.model';
import { url } from '../models/url.model';
@Injectable({ providedIn: 'root' })
export class ReaderService {
    public apiUrl:string;
    constructor(private http: HttpClient) {
        this.apiUrl=url;
    }
    searchbooks(title:string,authorName:string,publisher:string,publishDate:Date):Observable<BookDetails[]> {
      return this.http.get<BookDetails[]>(this.apiUrl +'/reader/searchbook?Title='+title+'&AuthorName='+authorName+'&Publisher='+publisher+'&RealeasedDate='+publishDate);
    }
    getpaiddetails(payment: number,user:number):Observable<BookPayDetails[]> {
      return this.http.get<BookPayDetails[]>(this.apiUrl+'/reader/getalldetails?BookId='+payment+'&userId='+user);
    }
    getnotifications(bookId: number):Observable<NotificationDetails[]> {
      return this.http.get<NotificationDetails[]>(this.apiUrl+'/reader/getnotifications?BookId='+bookId);
    }  
}



