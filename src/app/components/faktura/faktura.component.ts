import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Faktura } from 'src/app/dataModels/Faktura';
import { HttpserviceService } from 'src/app/services/httpservice.service';

import localePl from '@angular/common/locales/pl'
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-faktura',
  templateUrl: './faktura.component.html',
  styleUrls: ['./faktura.component.css']
})
export class FakturaComponent implements OnInit {

  constructor(private route: ActivatedRoute, private httpservice: HttpserviceService) { }

  faktura:Faktura;

  ngOnInit() {
    registerLocaleData(localePl, 'pl-PL');

   this.route.params.subscribe(p => {
     this.getFaktura(p.id);
   })
  }

  getFaktura(nr){
    this.httpservice.getFakturaByNr(nr).subscribe(ret => {
      this.faktura=ret;
      console.dir(this.faktura);
    })
  }

}
