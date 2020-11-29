import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FakturaAddComponent } from './components/faktura-add/faktura-add.component';
import { TestComponent } from './components/test/test.component';


const routes: Routes = [
  { path: '', component: FakturaAddComponent},
  { path: 'test', component: TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
