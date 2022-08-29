import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatebooksComponent } from './createbooks/createbooks.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      { path: 'login',component:LoginComponent },
    ]
  }, 
  {
    path: '',
    component: SignupComponent,
    children: [
     
      { path: 'register',component:SignupComponent },
      
    ]
  }, 
  
    
      { path: 'homepage',component:HomepageComponent },
    
  
  {
    path: '',
    component: CreatebooksComponent,
    children: [
      { path: 'createbooks',component:CreatebooksComponent },
    ]
  },
  { path: 'createbook/:bookId',component:CreatebooksComponent },
];

@NgModule({  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }