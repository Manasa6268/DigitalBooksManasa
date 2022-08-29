import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbooksComponent } from './searchbooks/searchbooks.component';
import { DisplaybooksComponent } from './displaybooks/displaybooks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReadbooksComponent } from './readbooks/readbooks.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    SearchbooksComponent,
    DisplaybooksComponent,
    ReadbooksComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    LayoutModule,
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
export class ReaderModule { }
