import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Loginregservice } from './loginregservice'; // Adjust the import path as necessary
@Injectable({
  providedIn: 'root'
})
export class Useraddressservice {
  
private defaultAddressSubject = new BehaviorSubject<any | null>(null);
  defaultAddress$ = this.defaultAddressSubject.asObservable();

  constructor(private loginRegService: Loginregservice) {}

  getAddress(userId: number): void {
    this.loginRegService.getAddresses(userId).subscribe({
      next: data => {
        if (data?.length) {
          this.defaultAddressSubject.next(data[0]);  // index 0 address
        }
      },
      error: err => console.error('Error fetching addresses:', err)
    });
  }
}