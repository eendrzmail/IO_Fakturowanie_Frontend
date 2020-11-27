import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FakturaAddComponent } from './components/faktura-add/faktura-add.component';


const routes: Routes = [
  { path: '', component: FakturaAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
