import { Component } from '@angular/core';
import { Useraddressservice } from '../services/useraddressservice'; // Assuming this service provides the default address  
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-sidebar',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './cart-sidebar.html',
  styleUrl: './cart-sidebar.css'
})
export class CartSidebar {
 defaultAddress: any;

  constructor(private userAddressService: Useraddressservice) {}

  ngOnInit(): void {
    this.userAddressService.defaultAddress$.subscribe(addr => {
      this.defaultAddress = addr;
      console.log('Default address:', this.defaultAddress);
    });
  }

}
