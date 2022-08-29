import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookDetails } from '../models/book.model';
import { url } from '../models/url.model';
@Injectable({ providedIn: 'root' })
export class AuthorService {
    public apiUrl:string;
    constructor(private http: HttpClient) {
        this.apiUrl=url;
    }
    gettoken(username: any, password: any):Observable<string> { 
        return this.http.post<any>(`${this.apiUrl}api/GetToken`,{username: username,password: password });
    }
    getAllBooks(AuthorId:number):Observable<BookDetails[]>{
        let headerparams=new HttpParams();
        headerparams.append("AuthorId",AuthorId);
        return this.http.get<BookDetails[]>(this.apiUrl+'/author/getallbooks?AuthorId='+AuthorId,
        {headers: new HttpHeaders(
            {
             'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Content-Type': 'application/json'
                 })});
    }
    getAllBooksbyId(BookId:number):Observable<BookDetails>{
        return this.http.get<BookDetails>(this.apiUrl+'/author/getallbooksbyId?bookId='+BookId,
        {headers: new HttpHeaders(
            {
             'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Content-Type': 'application/json'
                 })});
    }
    DeleteBook(BookId:number):Observable<BookDetails>{
        return this.http.delete<BookDetails>(this.apiUrl+'/author/deletebook?bookId='+BookId,
        {headers: new HttpHeaders(
            {
             'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Content-Type': 'application/json'
                 })});
    }
    BlockBook(BookId:number,status:number):Observable<any>{
        return this.http.put<any>(`${this.apiUrl}/author/blockbook`,{BookId:BookId,status:status},
        {headers: new HttpHeaders(
            {
             'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Content-Type': 'application/json'
                 })});
    }
    createBooks(book: BookDetails) {
        return this.http.post<any>(`${this.apiUrl}/author/createbook`,{
            "logo":book.logo,
            "title": book.title,
            "category": book.category,
            "price": book.price,
            "authorId": book.authorId,
            "publisher": book.publisher,
            "publishDate": book.publishDate,
            "content": book.content,
            "active": book.active,
            "createdDate": book.createdDate,
            "modifiedDate":book.modifiedDate,
            "authorName": book.authorName
          },
        {headers: new HttpHeaders(
            {
             'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Content-Type': 'application/json'
                 })});
      }  
      updateBook(book: BookDetails) {
        return this.http.put<any>(`${this.apiUrl}/author/editbook`,{
            "bookId":book.bookId,
            "logo":book.logo,
            "title": book.title,
            "category": book.category,
            "price": book.price,
            "authorId": book.authorId,
            "publisher": book.publisher,
            "publishDate": book.publishDate,
            "content": book.content,
            "active": book.active,
            "createdDate": book.createdDate,
            "modifiedDate":book.modifiedDate,
            "authorName": book.authorName
          },
        {headers: new HttpHeaders(
            {
             'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Content-Type': 'application/json'
                 })});
      }  
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        localStorage.removeItem('Name');
    }
}



