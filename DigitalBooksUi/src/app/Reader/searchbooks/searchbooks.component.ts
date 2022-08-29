import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookDetails } from 'src/app/models/book.model';
import { ReaderService } from 'src/app/services/reader.service';

@Component({
  selector: 'app-searchbooks',
  templateUrl: './searchbooks.component.html',
  styleUrls: ['./searchbooks.component.css']
})
export class SearchbooksComponent implements OnInit {
  
  books:BookDetails[]=[];
  date!:Date;
  book : BookDetails = {
    bookId:0,
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

  constructor(private readerService:ReaderService,private router:Router,private datepipe:DatePipe) {
    
  }
  

  ngOnInit(): void {
   
  }
  searchbooks()
  {
  
  this.router.navigate(['/displaybooks',this.book.title,this.book.authorName,this.book.publisher,this.book.publishDate]);
               
    
  }

  

 
}
 