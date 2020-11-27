import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Kontrahent } from '../dataModels/kontrahent';
import { Produkt } from '../dataModels/Produkt';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  kontrahenciAPI: string = 'https://5fbe1e625923c90016e6a866.mockapi.io/api/kontrahenci';
  localKontrahenciAPI: string = 'https://5fbe1e625923c90016e6a866.mockapi.io/api/localhontrahenci'

  produktyAPI: string = 'https://5fbe1e625923c90016e6a866.mockapi.io/api/produkty';

  constructor(private http:HttpClient) { }

  getLocalKontrahenciByName(name: string):Observable<Kontrahent[]>{
    return this.http.get<Kontrahent[]>(this.localKontrahenciAPI);
  }

  getKontrahenciByName(name: string):Observable<Kontrahent[]>{
    return this.http.get<Kontrahent[]>(this.kontrahenciAPI+`?nazwa=${name}`);
  }

  getProduktyByName(name: string):Observable<Produkt[]>{
    return this.http.get<Produkt[]>(this.produktyAPI+`?nazwa=${name}`);
  }
}
