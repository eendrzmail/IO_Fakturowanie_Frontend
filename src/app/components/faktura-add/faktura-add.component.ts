import { Component, OnInit } from '@angular/core';
import { Kontrahent } from 'src/app/dataModels/kontrahent';
import { Produkt } from 'src/app/dataModels/Produkt';
import { HttpserviceService } from 'src/app/services/httpservice.service';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith, subscribeOn, switchMap, tap} from 'rxjs/operators';
import { KontrahentToStringPipe } from '../../pipes/kontrahent-to-string.pipe';


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

  produkty: Array<Produkt>;
  produktyInput:string;
  produktyFaktura: Array<Produkt>;

  my2Control = new FormControl();


  ngOnInit() {

    this.httpService.getLocalKontrahenciByName("").subscribe(ret => {
      this.localkontrahenci=ret;
      this.kontrahenci=ret;
      this.filteredKontrahenci=ret;
      //console.table(this.kontrahenci);
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
    console.dir(this.k);
  }

  searchProdukt(){
    //console.log(this.produktyInput);
    this.httpService.getProduktyByName(this.produktyInput).subscribe( (ret) =>{
      this.produkty=ret;
    })
  }

  addProdukt(item: Produkt){
    this.produktyFaktura.push(item);
  }

}
