import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { map } from 'rxjs/operators';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { FakturaAddComponent } from './components/faktura-add/faktura-add.component';

import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { KontrahentToStringPipe } from './pipes/kontrahent-to-string.pipe';
import { MatListModule } from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';

import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { TestComponent } from './components/test/test.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { FakturyAllComponent } from './components/faktury-all/faktury-all.component';
import { FakturaComponent } from './components/faktura/faktura.component';
import { FakturaEditComponent } from './components/faktura-edit/faktura-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FakturaAddComponent,
    KontrahentToStringPipe,
    TestComponent,
    MainpageComponent,
    FakturyAllComponent,
    FakturaComponent,
    FakturaEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatListModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [ HttpClient, {provide: MAT_DATE_LOCALE, useValue: 'po-PL'}, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
