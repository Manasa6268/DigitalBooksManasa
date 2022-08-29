import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CreatebooksComponent } from './createbooks/createbooks.component';
import { HeaderComponent } from '../layout/header/header.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    CreatebooksComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ToastrModule.forRoot(
      {
        timeOut: 10000,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
      }
    ),
    BrowserAnimationsModule
  ]
})
export class AuthorModule { }
