import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Faktura } from 'src/app/dataModels/Faktura';
import { Kontrahent } from 'src/app/dataModels/kontrahent';
import { HttpserviceService } from 'src/app/services/httpservice.service';

import localePl from '@angular/common/locales/pl'
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-faktury-all',
  templateUrl: './faktury-all.component.html',
  styleUrls: ['./faktury-all.component.css']
})
export class FakturyAllComponent implements OnInit {

  constructor(private httpservice: HttpserviceService) { }

  kontrahenci= Array<Kontrahent>();
  filteredKontrahenci= Array<Kontrahent>();
  k: Kontrahent;

  kontrahentinput= new FormControl();

  faktury= Array<Faktura>();

  ngOnInit() {
    registerLocaleData(localePl, 'pl-PL');

    this.httpservice.getLocalKontrahenciByName('').subscribe(ret => {
      this.kontrahenci=ret;
      this.filteredKontrahenci=ret;
    })

  }




  getfakturynip(nip){
    this.httpservice.getFakturaByNIP(nip).subscribe(ret => {
      //console.dir(ret);
      this.faktury=ret;
    })
  }

  kontrahenciFilter(){

      this.filteredKontrahenci=this.kontrahenci.filter(x => x.nazwa.toLowerCase().includes(this.kontrahentinput.value.toLowerCase()));
  }

  selectKontrahent(value: Kontrahent){
    this.k=value;
    this.kontrahentinput.setValue(value.nazwa);

    this.getfakturynip(value.NIP);
    //console.dir(this.k);
  }

}
