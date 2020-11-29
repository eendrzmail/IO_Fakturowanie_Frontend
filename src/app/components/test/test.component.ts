import { Component, OnInit } from '@angular/core';

import { Faktura } from 'src/app/dataModels/Faktura';
import { HttpserviceService } from 'src/app/services/httpservice.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private httpservice: HttpserviceService) { }

  testfaktury:Faktura= new Faktura;

  ngOnInit() {
    
    this.httpservice.getFakturaByNr("1001").subscribe((ret)=>{
      this.testfaktury=Object.assign(ret);
      this.testfaktury.podsumuj();
      console.dir(this.testfaktury);
    })
  }

}
