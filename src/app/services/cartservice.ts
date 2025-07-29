import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  
@Injectable({
  providedIn: 'root'
})
export class Cartservice {
  cartUrl = "http://localhost:9004/cart/api/";

  constructor(private httpClient: HttpClient) {}  
  getUsercartProducts():Observable<Product[]> {
  return this.httpClient.get<GetResponse>(this.apiUrl)
      .pipe(
        map(response => response._embedded.product)
      );
    
  }

  
}
