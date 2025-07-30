import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';  
import { Login } from '../common/login';
@Injectable({
  providedIn: 'root'
})
export class Loginregservice {
  
  loginUrl: string = 'http://localhost:8088/api/users/login';
  registerUrl: string = 'http://localhost:8088/api/users/register';

  constructor(private httpClient: HttpClient){

  }

  //  login(credentials: { username: string; password: string }): Observable<any> {
  //   console.log('Login credentials:', credentials);
  //   return this.httpClient.post<Login>(this.loginUrl,credentials, {
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // });
  // }
login(credentials: { email: string; password: string }): Observable<any> {
return this.httpClient.post<Login>('http://localhost:8088/api/users/login', credentials, {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
});

  
}

postRegisterData(postData: any): Observable<any> {
  console.log('Registering user with data:', postData);
  return this.httpClient.post<Login>(this.registerUrl, postData, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });
}

getAddresses(userid:number): Observable<any[]> {

  const url = `http://localhost:8088/api/users/Address/${userid}`;
  return this.httpClient.get<any>(url, {
    headers: new HttpHeaders({  
      'Content-Type': 'application/json'
    })
  });
}
}
