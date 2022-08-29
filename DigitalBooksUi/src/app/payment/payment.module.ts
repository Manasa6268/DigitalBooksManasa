import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookpaymenyComponent } from './bookpaymeny/bookpaymeny.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    BookpaymenyComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
export class PaymentModule { }
