import { Kontrahent } from './kontrahent';
import { wierszFaktury } from './wierszFaktury';

export class Faktura{
    nr_faktury?: number;
    kupujacy: Kontrahent;
    sprzedajacy: Kontrahent;
    data_wystawienia: Date;
    data_sprzedazy: Date;
    status: string;
    forma_platnosci: string;
    data_platnosci: string;
    wiersze: wierszFaktury[]= new Array<wierszFaktury>();

    suma_netto:number;
    suma_vat:number;
    suma_brutto:number;


    podsumuj(){

        let a= this.wiersze.map(item => {return +item.wartosc_netto});
        if (a.length>0)
            this.suma_netto= +a.reduce((aa,bb) => {return aa+bb}).toFixed(2);
        
        let vat= this.wiersze.map(item2 => {return +item2.wartosc_vat});
        if (vat.length>0)
            this.suma_vat= +vat.reduce((ff,gg) => {return ff+gg}).toFixed(2);

        let br= this.wiersze.map((item3) => {return +item3.wartosc_brutto});
        if(br.length>0)
            this.suma_brutto= +br.reduce((r,t) => {return r+t}).toFixed(2);
    }
}