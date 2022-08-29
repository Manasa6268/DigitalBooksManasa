import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { DatePipe } from '@angular/common';

import { BookDetails } from 'src/app/models/book.model';
import { AuthorService } from 'src/app/services/author.service';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/services/fileupload.service';

@Component({
    selector: 'app-createbooks',
    templateUrl: './createbooks.component.html',
    styleUrls: ['./createbooks.component.css']
  })
export class CreatebooksComponent implements OnInit {

    loading = false;
    submitted = false;
    returnUrl: string='';
    id=0;
    addmode=false;
    btntxt='';
    file!: File;
    shortLink:string='';
    books:BookDetails[] = [];
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
      createdDate:  new Date(),
      modifiedDate:  new Date()
    }
    constructor(
        
        private router: Router,
        private authorService: AuthorService,
        
        private datePipe:DatePipe,
        private activatedRoot:ActivatedRoute,
        private toaster:ToastrService,
        private fileUploadService:FileUploadService
       
    ) {
        
    }
    
    ngOnInit() { 
        this.id=this.activatedRoot.snapshot.params['bookId'];
        this.GetbookbyId();
        if(this.id>0)
        {
            this.btntxt="Update Book";
        }
        else{
            this.btntxt="Create Book";
        }
       
    }
    onChange(event: any) {
    
        this.file = event.target.files[0]
      }
      
    onUploadFile()
    {
       
        this.shortLink=this.fileUploadService.uploadfile(this.file);
    }
    onSubmit() {
        this.submitted = true;
        
        this.loading = true;
        
        this.book.authorName=localStorage.getItem('Name');
        this.book.authorId=Number(localStorage.getItem('userid'));
        this.book.logo=this.shortLink;
        if(this.id>0)
        {
        this.authorService.updateBook(this.book)
            .pipe(first())
            .subscribe(
                data => {
                    this.toaster.success('Book Updated Successfully!');
                    this.router.navigate(['/homepage']);
                },
                error => {
                    
                    this.loading = false;
                    console.log(error);
                });
            }
            else
            {
                this.authorService.createBooks(this.book)
                .pipe(first())
                .subscribe(
                    data => {
                        this.toaster.success('Book Created Successfully!');
                        this.router.navigate(['/homepage']);
                    },
                    error => {
                        
                        this.loading = false;
                        console.log(error);
                    });
                
            }
    }
   clickMe()
   {
    this.router.navigate(['/homepage']);
   }
   GetbookbyId()
   {
    this.authorService.getAllBooksbyId(this.id)
    .subscribe(
        data => {
            this.book=data;
        })

   }
   
  
  
}


