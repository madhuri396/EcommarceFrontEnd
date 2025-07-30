import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core'; 
import { Loginregservice } from '../services/loginregservice'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Userservice } from '../services/userservice';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
  import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-addresscomponent',
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './addresscomponent.html',
  styleUrl: './addresscomponent.css'
})


export class AddressComponent implements OnInit {
  addresses: any[] = [];
  selectedAddressIndex: number | null = null;
  userId: number = 0;

  constructor(private http: HttpClient, private loginRegService: Loginregservice,private route:ActivatedRoute , private userService: Userservice,) {}
//userId:number = 0;
  ngOnInit(): void {
   const useridcheck = this.route.snapshot.paramMap.has('userid');
   console.log
this.userService.user$.subscribe(user => {
    if (user?.id) {
      this.userId = user.id;
    }
    this.getAddress().subscribe({
    next: data => this.addresses = data,
    error: err => console.error('Error fetching addresses:', err)
  });

  });
}
   getAddress(): Observable<any[]> {
  if (this.userId) {
    return this.loginRegService.getAddresses(this.userId);
  } else {
    console.warn('User ID not available in LoginRegService');
    return of([]); // or throw an error
  }
}
  


  selectAddress(index: number): void {
    this.selectedAddressIndex = index;
  }
}