import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from '../layout/aboutus/aboutus.component';
import { DisplaybooksComponent } from './displaybooks/displaybooks.component';
import { ReadbooksComponent } from './readbooks/readbooks.component';
import { SearchbooksComponent } from './searchbooks/searchbooks.component';

const routes: Routes = [
  {
    path: '',
    component:ReadbooksComponent,
    children: [
      { path: 'readbooks',component:ReadbooksComponent },
      { path: 'search',component:SearchbooksComponent },
      { path: 'aboutus',component:AboutusComponent },
    ]
  },
  {
    path: '',
    component:DisplaybooksComponent,
    children: [
      { path: 'readbooks',component:ReadbooksComponent },
      { path: 'search',component:SearchbooksComponent },
      { path: 'aboutus',component:AboutusComponent },
    ]
  },
  {
    path: '',
    component:ReadbooksComponent,
    children: [
      { path: 'readbooks',component:ReadbooksComponent },
      { path: 'search',component:SearchbooksComponent },
      { path: 'aboutus',component:AboutusComponent },
    ]
  },
  
];

@NgModule({  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReaderRoutingModule { }