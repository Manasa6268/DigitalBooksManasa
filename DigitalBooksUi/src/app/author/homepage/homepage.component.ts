import { R3SelectorScopeMode } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookDetails } from 'src/app/models/book.model';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  pageTitile: string = 'show books';
  showIcon: boolean = false;
  filter: string = '';
  UserName:string|null= '';
  activebook=false;
  
  status: any = 0;
  bookdetails:BookDetails[]=[];
  userId:number=0;
  books: BookDetails =
    {
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
  
   
  constructor(private authorservice:AuthorService,private router: Router,private toaster:ToastrService,private activeroute:ActivatedRoute) { }
  
  ngOnInit(): void {
    this.UserName = localStorage.getItem('Name');
    this.userId=Number(localStorage.getItem('userid'));
    
    this.activebook=true;
    
    this.authorservice.getAllBooks(this.userId)
    .subscribe(
      response => {
        this.bookdetails=response;
       
      },
      error => {
          console.log(error);
      });;
      
  }
  reloadData()
  {
    this.authorservice.getAllBooks(this.userId)
    .subscribe(
      response => {
        this.bookdetails=response;
      },
      error => {
          
          console.log(error);
      });;
  }
  
  ClickMe()
  {
   this.router.navigate(['/createbooks']);

  }
  onsavechanged(value:boolean)
  {

  }
 
   
  logout()
  {
  this.authorservice.logout();
  }
  DeleteBook(id:number)
  {
    this.authorservice.DeleteBook(id)
    .subscribe(
      response => {
        this.books=response;
        this.toaster.success('Book Deleted Successfully!');
        window.location.reload();
        this.reloadData()
        this.router.navigate(['/homepage']);
      },
      error => {
          
          console.log(error);
      });;
    
  }
  actionBtnClick(id:number,status:number)
  {
    if(status==0)
    {
      this.status=1
    }
    else if(status==1)
    {
      this.status=0
    }
    console.log(localStorage.getItem('token'))
    this.authorservice.BlockBook(id,this.status)
    .subscribe(
      response => {
        this.books=response;
        
        window.location.reload();
        this.reloadData()
        this.router.navigate(['/homepage']);
      },
      error => {
          
          console.log(error);
      });;
  }
  
}
