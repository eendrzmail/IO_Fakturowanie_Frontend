import { Component, OnInit } from '@angular/core';
import { Kontrahent } from 'src/app/dataModels/kontrahent';
import { Produkt } from 'src/app/dataModels/Produkt';
import { HttpserviceService } from 'src/app/services/httpservice.service';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith, subscribeOn, switchMap, tap} from 'rxjs/operators';
import { KontrahentToStringPipe } from '../../pipes/kontrahent-to-string.pipe';
import { Faktura } from 'src/app/dataModels/Faktura';
import { wierszFaktury } from 'src/app/dataModels/wierszFaktury';



@Component({
  selector: 'app-faktura-add',
  templateUrl: './faktura-add.component.html',
  styleUrls: ['./faktura-add.component.css']
})
export class FakturaAddComponent implements OnInit {

  constructor(private httpService: HttpserviceService) { }

  localkontrahenci: Array<Kontrahent>;
  kontrahenci: Array<Kontrahent>;
  filteredKontrahenci: Kontrahent[];
  k: Kontrahent;
  sprzedajacy:Kontrahent = {nazwa:"Nasza firma",adres: "Rzeszów 112",NIP: "0000000001"};

  produkty: Array<Produkt>;
  produktyInput:string;
  produktyFaktura: Array<Produkt> = [];

  my2Control = new FormControl();
  dataControl= new FormControl();

  ///
  faktura:Faktura= new Faktura;


  ngOnInit() {

    this.httpService.getLocalKontrahenciByName("").subscribe(ret => {
      this.localkontrahenci=ret;
      this.kontrahenci=ret;
      this.filteredKontrahenci=ret;
      //console.table(this.kontrahenci);


      this.faktura.sprzedajacy={id:1,nazwa:"Nasza firma",adres: "Rzeszów 112",NIP: "0000000001"};

      this.dataControl.valueChanges.subscribe(ret => {
        this.faktura.data_wystawienia=ret;
      })
    })
    

  }


  kontrahenciFilter($event){
    if (this.my2Control.value==""){
      this.filteredKontrahenci=this.localkontrahenci;
      this.kontrahenci=this.filteredKontrahenci;
    }
    else if (this.my2Control.value.length == 1 ) {
      this.httpService.getKontrahenciByName(this.my2Control.value).subscribe(ret => {
        let temp:Kontrahent[]= ret;

        this.kontrahenci=[];
        this.kontrahenci.push(...this.localkontrahenci);
        this.kontrahenci.push(...temp);
        console.table(this.kontrahenci);

        this.filteredKontrahenci=this.kontrahenci;
        this.filteredKontrahenci=this.kontrahenci.filter(x => x.nazwa.toLowerCase().includes(this.my2Control.value.toLowerCase()));
      })
      
    }
    else{
      this.filteredKontrahenci=this.kontrahenci.filter(x => x.nazwa.toLowerCase().includes(this.my2Control.value.toLowerCase()));
    }
    
    //console.table(this.filteredKontrahenci);
  }

  selectKontrahent(value: Kontrahent){
    this.k=value;
    this.my2Control.setValue(value.nazwa);
    this.faktura.kupujacy=this.k;
    //console.dir(this.k);
  }

  searchProdukt(){
    //console.log(this.produktyInput);
    this.httpService.getProduktyByName(this.produktyInput).subscribe( (ret) =>{
      this.produkty=ret;
    })
  }

  addProdukt(item: Produkt){
    this.produktyFaktura.push(item);
    this.faktura.wiersze.push(new wierszFaktury(item,1));
    this.faktura.podsumuj();
  }


  testsend(){
    let a: Kontrahent= {nazwa:"zenek",adres:"adress",NIP:"1234567890"};
    this.httpService.sendKontrahent(a).subscribe(ret =>
      console.log(ret)
      );
  }

  zmienIlosc(wiersz:wierszFaktury,val: number){
    //console.log(val);
    wiersz.zmienIlosc(val);
    this.faktura.podsumuj();
    console.dir(this.faktura);
  }

  sendFaktura(){
    if (this.faktura.wiersze.length>0 && this.faktura.kupujacy && this.faktura.sprzedajacy){
      this.httpService.sendFaktura(this.faktura).subscribe((ret) => {
        console.dir(ret);
      })
    }
  }

}
