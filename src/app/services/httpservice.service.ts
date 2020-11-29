import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Faktura } from '../dataModels/Faktura';
import { Kontrahent } from '../dataModels/kontrahent';
import { Produkt } from '../dataModels/Produkt';
import { map } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { wierszFaktury } from '../dataModels/wierszFaktury';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  kontrahenciAPI: string = 'https://5fbe1e625923c90016e6a866.mockapi.io/api/kontrahenci';
  localKontrahenciAPI: string = 'https://5fbe1e625923c90016e6a866.mockapi.io/api/localhontrahenci'

  produktyAPI: string = 'https://5fbe1e625923c90016e6a866.mockapi.io/api/produkty';

  fakturyAPI='http://127.0.0.1:3000/faktury';

  constructor(private http:HttpClient) { }

  // GET
  getLocalKontrahenciByName(name: string):Observable<Kontrahent[]>{
    return this.http.get<Kontrahent[]>(this.localKontrahenciAPI);
  }

  getKontrahenciByName(name: string):Observable<Kontrahent[]>{
    return this.http.get<Kontrahent[]>(this.kontrahenciAPI+`?nazwa=${name}`);
  }

  getProduktyByName(name: string):Observable<Produkt[]>{
    return this.http.get<Produkt[]>(this.produktyAPI+`?nazwa=${name}`);
  }

  getFakturaByNr(nr:string):Observable<Faktura>{
    return this.http.get<Faktura>(this.fakturyAPI+`?nr_faktury=${nr}`)
    .pipe(
      map(result => {
        let temp:Faktura=new Faktura;
        let temp2 = Object.assign(temp,result);

        // mapowanie wierszy
        for (let i in result.wiersze){
          let tempwiersz:wierszFaktury =new wierszFaktury(result.wiersze[i].produkt,result.wiersze[i].ilosc);
          temp2.wiersze[i] = tempwiersz;
        }

        temp2.podsumuj();
        return temp2;
      })
    );
  }

  sendKontrahent(a:Kontrahent){
    /*
    const params= new HttpParams()
      .set('object', JSON.stringify(a));
    */
    const headers = { 'content-type': 'application/json',responseType: 'text'}  
    const body = JSON.stringify({"object":JSON.stringify(a)});
    return this.http.post("http://localhost:3000/kontrahenci",body,{'headers': headers});
    //return this.http.get('http://localhost:3000/kontrahenci');
    /*
    return new Promise((resolve,reject) => {

      
      let fd =new FormData();
      fd.append('object',"img");
      
  
      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3000/kontrahenci', true);
      
      xhr.onload = resolve;
      xhr.onerror = reject;

      xhr.setRequestHeader("Content-Type", "text");
  
      xhr.send(fd);
    })
    */
    
    
    
    //return this.http.put("http://localhost:3000/kontrahenci",{params},{responseType: 'text'}).subscribe();
    
  }

  //POST
  sendFaktura(f:Faktura){
    const headers = { 'content-type': 'application/json',responseType: 'json'}  
    const body = JSON.stringify({"object":JSON.stringify(f)});
    return this.http.post("http://localhost:3000/faktury",body,{'headers': headers});
  }
}
