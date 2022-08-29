import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatebooksComponent } from '../author/createbooks/createbooks.component';
import { HomepageComponent } from '../author/homepage/homepage.component';
import { LoginComponent } from '../author/login/login.component';
import { SignupComponent } from '../author/signup/signup.component';
import { BookpaymenyComponent } from '../payment/bookpaymeny/bookpaymeny.component';
import { DisplaybooksComponent } from '../Reader/displaybooks/displaybooks.component';
import { ReadbooksComponent } from '../Reader/readbooks/readbooks.component';
import { SearchbooksComponent } from '../Reader/searchbooks/searchbooks.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { MainpageComponent } from './mainpage/mainpage.component';

const routes: Routes = [
  {
    path: '',
    component: MainpageComponent,
    children: [
      { path: 'search',component:SearchbooksComponent },
      { path: 'aboutus',component:AboutusComponent },
      
      { path:'',component:LandingpageComponent}
    ]
  }, 
  { path: 'displaybooks/:title/:authorName/:publisher/:publishDate',component:DisplaybooksComponent },
  { path: 'readbooks/:bookId/:userId',component:ReadbooksComponent }
  
  
];

@NgModule({  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
