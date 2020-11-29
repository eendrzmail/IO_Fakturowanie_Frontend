import { Produkt } from './Produkt';

export class wierszFaktury{
    nr_faktury: string;
    produkt: Produkt;
    ilosc: number;
    wartosc_netto: number;
    wartosc_vat: number;
    wartosc_brutto: number;

    constructor(produkt: Produkt,ilosc:number,){
        this.produkt=produkt;
        this.ilosc=ilosc;

        this.wartosc_netto= +(this.produkt.cena_netto*this.ilosc).toFixed(2);
        this.wartosc_vat=+(this.produkt.wartosc_VAT/100*this.wartosc_netto*this.ilosc).toFixed(2);
        this.wartosc_brutto=+(this.wartosc_netto+this.wartosc_vat).toFixed(2);
    }

    zmienIlosc(n: number){
        this.ilosc=n;

        this.wartosc_netto=+(this.produkt.cena_netto*this.ilosc).toFixed(2);
        this.wartosc_vat=+(this.produkt.wartosc_VAT/100*this.wartosc_netto*this.ilosc).toFixed(2);
        this.wartosc_brutto=+(this.wartosc_netto+this.wartosc_vat).toFixed(2);
    }

    przelicz(){
        this.wartosc_netto=+(this.produkt.cena_netto*this.ilosc).toFixed(2);
        this.wartosc_vat=+(this.produkt.wartosc_VAT/100*this.wartosc_netto*this.ilosc).toFixed(2);
        this.wartosc_brutto=+(this.wartosc_netto+this.wartosc_vat).toFixed(2);
    }

}
