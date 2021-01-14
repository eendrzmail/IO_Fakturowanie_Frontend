import { Component, OnInit } from '@angular/core';
import { Kontrahent } from 'src/app/dataModels/kontrahent';
import { Produkt } from 'src/app/dataModels/Produkt';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { Router} from '@angular/router';

import {FormControl,Validators} from '@angular/forms';
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

  constructor(
    private httpService: HttpserviceService,
    private router: Router) { }

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
  data_sprzedazy_control= new FormControl();
  data_platnosci_control=new FormControl();
  statusinput= new FormControl();
  formainput= new FormControl();

  knipcontrol = new FormControl();

  ///
  faktura:Faktura= new Faktura;
  fakturavalidator=true;


  ngOnInit() {
    //pobierz swoja firme lokalnie
    this.httpService.getLocalSelf().subscribe(self => {
      console.dir(self);
      this.faktura.sprzedajacy=self;
    })
    // pobierz lokalnych kontrahentow
    this.httpService.getLocalKontrahenciByName("").subscribe(ret => {
      this.localkontrahenci=ret;
      this.kontrahenci=ret;
      this.filteredKontrahenci=ret;
      //console.table(this.kontrahenci);


      //this.faktura.sprzedajacy={id:1,nazwa:"Nasza firma",adres: "Rzeszów 112",NIP: "0000000001"};

      
    })


    this.inputListeners();

  }


  kontrahenciFilter($event){
    if (this.my2Control.value==""){
      this.filteredKontrahenci=this.localkontrahenci;
      this.kontrahenci=this.filteredKontrahenci;
    }
    else if (this.my2Control.value.length == 1 ) {
      this.httpService.getKontrahenciByName(this.my2Control.value).subscribe(ret => {
        let temp:Kontrahent[]= ret;
        
        for (let l of this.localkontrahenci){
          temp=temp.filter(k => {return k.NIP!=l.NIP});
        }

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
    this.fvalidator();
  }

  //pobranie produktow z api
  searchProdukt(){
    //console.log(this.produktyInput);
    if (this.k!=undefined) {
      this.httpService.getProduktyByName(this.produktyInput,this.k.NIP).subscribe( (ret) =>{
        this.produkty=ret;
      })
    }
    else {
      this.httpService.getProduktyByName(this.produktyInput).subscribe( (ret) =>{
        this.produkty=ret;
      })
    }
      
  }

  addProdukt(item: Produkt){
    this.produktyFaktura.push(item);
    this.faktura.wiersze.push(new wierszFaktury(item,1));
    this.faktura.podsumuj();
    this.fvalidator();
  }


  //----
  testsend(){
    let a: Kontrahent= {nazwa:"zenek",adres:"adress",NIP:"1234567890"};
    this.httpService.sendKontrahent(a).subscribe(ret =>
      console.log(ret)
      );
  }

  zmienIlosc(wiersz:wierszFaktury,val: number){
    console.log(val);
    wiersz.zmienIlosc(val);
    this.faktura.podsumuj();
    console.dir(this.faktura);
    this.fvalidator();
  }

  removeItem(item:wierszFaktury){
    console.dir(item);
    this.faktura.wiersze=this.faktura.wiersze.filter( ob => {return ob!=item});
    this.fvalidator();
  }



  // Walidator
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


  sendFaktura(){
    if (this.faktura.wiersze.length>0 && this.faktura.kupujacy && this.faktura.sprzedajacy){
      if (!this.faktura.status){
        this.faktura.status="Edytowalna";
        console.log("Zamieniam status");
      }

      
      this.httpService.sendFaktura(this.faktura).subscribe((ret) => {
        //console.dir(ret);
        let nr:any=ret;
        if (nr.nr_faktury){
          console.log(nr.nr_faktury);
          this.router.navigate(['/faktura/'+nr.nr_faktury]);
        }
        else{
          console.log("cos innego");
        }
      })
      
    }
  }











  getKontrahentByNip(nip){
    this.httpService.getKontrahenciByNIP(nip).subscribe(ret => {
      console.dir(ret);
      this.k=ret;
      this.faktura.kupujacy=this.k;
      //console.dir(this.k);
      this.fvalidator();
    })
  }





  inputListeners(){

    this.knipcontrol.valueChanges.subscribe(ret => {
      //tu na 10
      if (ret.length==2) {
        console.log("wyszukuje po nipie");
        this.getKontrahentByNip(ret);
      }
    })

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

}
