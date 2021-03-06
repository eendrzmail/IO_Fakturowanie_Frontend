import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import localePl from '@angular/common/locales/pl'
import { registerLocaleData } from '@angular/common';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { Faktura } from 'src/app/dataModels/Faktura';
import { FormControl } from '@angular/forms';
import { wierszFaktury } from 'src/app/dataModels/wierszFaktury';
import { Produkt } from 'src/app/dataModels/Produkt';


@Component({
  selector: 'app-faktura-edit',
  templateUrl: './faktura-edit.component.html',
  styleUrls: ['./faktura-edit.component.css']
})
export class FakturaEditComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private httpservice: HttpserviceService,
    private router: Router) { }

  produkty: Array<Produkt>;
  produktyInput:string;
  filteredProdukty: Array<Produkt>;

  faktura: Faktura;

  my2Control = new FormControl();
  dataControl= new FormControl();
  data_sprzedazy_control= new FormControl();
  data_platnosci_control=new FormControl();
  statusinput= new FormControl();
  formainput= new FormControl();

  fakturavalidator=true;

  

  ngOnInit() {
    registerLocaleData(localePl, 'pl-PL');

    this.route.params.subscribe(p => {
      this.getFaktura(p.id);
    })

    this.inputListeners();
  }

  getFaktura(nr){
    this.httpservice.getFakturaByNr(nr).subscribe(ret => {
      this.faktura=ret;
      console.dir(this.faktura);

      this.dataControl.setValue(ret.data_wystawienia);
      this.data_sprzedazy_control.setValue(ret.data_sprzedazy);
      this.data_platnosci_control.setValue(ret.data_sprzedazy);
      this.statusinput.setValue(ret.status);
      this.formainput.setValue(ret.forma_platnosci);
      //this.fvalidator();
    })
  }

  pobierzProdukty(nip){
    this.httpservice.getAllProdukty(nip).subscribe(ret => {
      console.dir(ret);
      this.produkty=ret;
      this.filteredProdukty=ret;
    })
  }

  searchProdukt(){
    //console.log(this.produktyInput);
    if (this.faktura.kupujacy.NIP) {
      /*
      this.httpService.getProduktyByName(this.produktyInput,this.k.NIP).subscribe( (ret) =>{
        this.produkty=ret;
      })
      */
      if (this.produktyInput.length>1)
        this.produktFilter()
      else{
        this.pobierzProdukty(this.faktura.kupujacy.NIP);
        this.filteredProdukty=this.produkty;
      }  
    }
    else {
      /*
      this.httpService.getProduktyByName(this.produktyInput).subscribe( (ret) =>{
        this.produkty=ret;
      })
      */
     if (this.produktyInput.length>1)
        this.produktFilter()
      else{
        this.pobierzProdukty(this.faktura.kupujacy.NIP);
        this.filteredProdukty=this.produkty;
      }  
    }
      
  }
  produktFilter(){
    //console.log("Filtruje");
    this.filteredProdukty=this.produkty.filter(p => p.nazwa.toLowerCase().includes(this.produktyInput.toLowerCase()));

  }

  removeItem(item:wierszFaktury){
    console.dir(item);
    this.faktura.wiersze=this.faktura.wiersze.filter( ob => {return ob!=item});
    this.fvalidator();
  }

  zmienIlosc(wiersz:wierszFaktury,val: number){
    console.log(val);
    wiersz.zmienIlosc(val);
    this.faktura.podsumuj();
    console.dir(this.faktura);
    this.fvalidator();
  }
  
  addProdukt(item: Produkt){
    //this.produktyFaktura.push(item);
    this.faktura.wiersze.push(new wierszFaktury(item,1));
    this.faktura.podsumuj();
    this.fvalidator();
  }




  fvalidator(){
    //if (this.faktura.wiersze.length>0 && this.faktura.kupujacy && this.faktura.sprzedajacy && )
    this.fakturavalidator= !(
                            this.faktura.wiersze.length>0 && 
                            this.faktura.kupujacy!=undefined && 
                            this.faktura.sprzedajacy!=undefined &&
                            this.faktura.data_wystawienia &&
                            this.faktura.data_sprzedazy
                            );
    console.log(this.fakturavalidator);
  }

  inputListeners(){
    // DATA WYSTAWIENIA
    this.dataControl.valueChanges.subscribe(ret => {
      this.faktura.data_wystawienia=ret;
      //
      //this.faktura.data_sprzedazy=ret;
      //this.faktura.data_platnosci=ret;
      //this.faktura.forma_platnosci="karta";
      this.fvalidator();
      console.dir(this.faktura);
    })

    this.data_sprzedazy_control.valueChanges.subscribe(val => {
      this.faktura.data_sprzedazy=val;
      this.fvalidator();
    })

    this.data_platnosci_control.valueChanges.subscribe(val => {
      this.faktura.data_platnosci=val;
      this.fvalidator();
    })

    this.statusinput.valueChanges.subscribe(val => {
      this.faktura.status=val;
      this.fvalidator();
    })

    this.formainput.valueChanges.subscribe(val => {
      this.faktura.forma_platnosci=val;
      this.fvalidator();
    })


  }

  updateFaktura(){
    console.dir(this.faktura);
    this.httpservice.updateFaktura(this.faktura).subscribe(ret => {
      let a:any=ret;
      if (a.status=="ok"){
        this.router.navigate(['/faktura/'+this.faktura.nr_faktury]);
      }
      else{

      }
    })
  }

}
