import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { MainpageComponent } from './mainpage/mainpage.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AuthorRoutingModule } from '../author/author-routing.module';
import { PaymentRoutingModule } from '../payment/payment-routing.module';
import { LandingpageComponent } from './landingpage/landingpage.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    MainpageComponent,
    AboutusComponent,
    LandingpageComponent

  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    AuthorRoutingModule,
    PaymentRoutingModule
  ]
})
export class LayoutModule { }
