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
  //local
  localKontrahenciAPI: string = 'https://inz-opr.herokuapp.com/kontrahenci';//'https://5fbe1e625923c90016e6a866.mockapi.io/api/localhontrahenci'

  produktyAPI: string = 'https://5fbe1e625923c90016e6a866.mockapi.io/api/produkty';

  //local
  fakturyAPI='https://inz-opr.herokuapp.com/faktury';
  fakturyAPI2='http://localhost:3000/faktury';
  

  constructor(private http:HttpClient) { }

  // GET
  getLocalSelf():Observable<Kontrahent> {
    return this.http.get<Kontrahent>(this.localKontrahenciAPI+"/self");
  }
  getLocalKontrahenciByName(name: string):Observable<Kontrahent[]>{
    return this.http.get<Kontrahent[]>(this.localKontrahenciAPI);
  }

  getKontrahenciByName(name: string):Observable<Kontrahent[]>{
    return this.http.get<Kontrahent[]>(this.kontrahenciAPI+`?nazwa=${name}`);
  }



  getProduktyByName(name: string,nip?: string):Observable<Produkt[]>{
    console.log("Podano nip:"+nip);
    let q= `?nazwa=${name}`;
    if (nip){
      q+=`&nip=${nip}`;
    }
    return this.http.get<Produkt[]>(this.produktyAPI+q);
  }

  //        FAKTURA
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

  getFakturaByNIP(nip):Observable<Faktura[]> {
    return this.http.get<Faktura[]>(this.fakturyAPI+`?nip=${nip}`)
    .pipe(
      map(faktury => {
        faktury.map(result => {

          console.dir(result);

          let temp:Faktura=new Faktura;
          let temp2= Object.assign(temp,result);

          for (let i in result.wiersze){
            //console.dir(result.wiersze[i].produkt);
            let tempwiersz:wierszFaktury =new wierszFaktury(result.wiersze[i].produkt,result.wiersze[i].ilosc);
            temp2.wiersze[i] = tempwiersz;
          }

          temp2.podsumuj();
          return temp2;

        })
        
        return faktury;
      })
    )
  }

  getFakturaByDate(date: Date):Observable<Faktura[]> {
    //et a=date.g
    let q="?data=\""+date.getFullYear()+"-"+(+date.getMonth()+1)+"-"+date.getDate()+"\"";
    //console.log(q);
    return this.http.get<Faktura[]>(this.fakturyAPI+q)
    .pipe(
      map(faktury => {
        faktury.map(result => {

          console.dir(result);

          let temp:Faktura=new Faktura;
          let temp2= Object.assign(temp,result);

          for (let i in result.wiersze){
            //console.dir(result.wiersze[i].produkt);
            let tempwiersz:wierszFaktury =new wierszFaktury(result.wiersze[i].produkt,result.wiersze[i].ilosc);
            temp2.wiersze[i] = tempwiersz;
          }

          temp2.podsumuj();
          return temp2;

        })
        
        return faktury;
      })
    )
  }

  sendKontrahent(a:Kontrahent){
    /*
    const params= new HttpParams()
      .set('object', JSON.stringify(a));
    */
    const headers = { 'content-type': 'application/json',responseType: 'text'}  
    const body = JSON.stringify({"object":JSON.stringify(a)});
    return this.http.post(this.localKontrahenciAPI,body,{'headers': headers});

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
    return this.http.post(this.fakturyAPI,body,{'headers': headers});
  }

  updateFaktura(f:Faktura){
    //console.log("PUT");
    const headers = { 'content-type': 'application/json',responseType: 'json'}  
    const body = JSON.stringify({"object":JSON.stringify(f)});
    return this.http.put(this.fakturyAPI,body,{'headers': headers});
  }
}
