import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule} from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { CommonModule } from '@angular/common';
import { AuthorModule } from './author/author.module';
import { ReaderModule } from './Reader/Reader.module';
import { HttpClientModule } from '@angular/common/http';
import { PaymentModule } from './payment/payment.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
   
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot([
      
    ]),
    LayoutModule,
    AuthorModule,
    ReaderModule,
    PaymentModule,
    ToastrModule.forRoot(
      {
        timeOut: 10000,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
      }
    ),
    BrowserAnimationsModule
    
    
   
  ],
  providers:  [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
