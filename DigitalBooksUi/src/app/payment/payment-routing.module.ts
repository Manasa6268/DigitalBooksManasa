import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookpaymenyComponent } from './bookpaymeny/bookpaymeny.component';

const routes: Routes = [
  {
    path: '',
    component: BookpaymenyComponent,
    children: [
      { path: 'payment', component: BookpaymenyComponent },
    ]
  },
  { path: 'payment/:bookId', component: BookpaymenyComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }