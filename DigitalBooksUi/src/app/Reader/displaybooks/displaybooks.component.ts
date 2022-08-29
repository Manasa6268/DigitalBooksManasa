import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDetails } from 'src/app/models/book.model';
import { ReaderService } from 'src/app/services/reader.service';

@Component({
  selector: 'app-displaybooks',
  templateUrl: './displaybooks.component.html',
  styleUrls: ['./displaybooks.component.css']
})
export class DisplaybooksComponent implements OnInit {
  books:BookDetails[]=[];
  title:string='';
  authorName:string='';
  publisher:string='';
  publishDate:any;
  displaybooks:string=''
  constructor(private router:Router, private activatedRoot:ActivatedRoute,private readerService:ReaderService) { }
  ngOnInit(): void {
    this.title=this.activatedRoot.snapshot.params['title'];
    this.authorName=this.activatedRoot.snapshot.params['authorName'];
    this.publisher=this.activatedRoot.snapshot.params['publisher'];
    this.publishDate=this.activatedRoot.snapshot.params['publishDate'];
    this.searchbooks();
  }
  searchbooks()
  {
    this.readerService.searchbooks(this.title,this.authorName,this.publisher,this.publishDate
      )
            .subscribe(
              data => {
                this.books=data;
                if(this.books.length>0)
                {
                  this.displaybooks="";
                }
                else
                {
                  this.displaybooks="No Books Found";
                }
                },
                error => {
                    
                    console.log(error);
                });
  }
clickMe(id:number)
{
  this.router.navigate(['/payment',id]);
}
clicklogin(){
  this.router.navigate(["/login"]);
}
clickabout()
{
  this.router.navigate(["/aboutus"]);
}
clicksearch()
{
  this.router.navigate(["/search"]);
}
}
