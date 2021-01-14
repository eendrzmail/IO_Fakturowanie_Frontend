import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FakturaAddComponent } from './components/faktura-add/faktura-add.component';
import { FakturaEditComponent } from './components/faktura-edit/faktura-edit.component';
import { FakturaComponent } from './components/faktura/faktura.component';
import { FakturyAllComponent } from './components/faktury-all/faktury-all.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { TestComponent } from './components/test/test.component';


const routes: Routes = [
  { path: 'new', component: FakturaAddComponent},
  { path: '', component: MainpageComponent},
  { path: 'faktury', component: FakturyAllComponent},
  { path: 'faktura/:id', component: FakturaComponent},
  { path: 'edytuj/:id', component: FakturaEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
