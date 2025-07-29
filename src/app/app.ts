import { Component, Input, signal } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list/Product-list-component';
import { ProductComponent } from './product-component/product-component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedService } from './services/shared.services';
import { Product } from './common/product';
import { Categoryservice } from './services/categoryservice';
import { Category } from './common/category';
import { Productdetailscomponent } from './productdetailscomponent/productdetailscomponent';
import { ChangeDetectorRef } from '@angular/core';
import { Login } from './common/login';
import { Userservice } from './services/userservice';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule, RouterModule,FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  implements OnInit {
  protected readonly title = signal('example-app');
  isSidebarOpen = false;
sear: string = '';
products:Product[] = [];
categories:Category[] = [];
UserData:Login | null = null;
isLoggedIn = false;
showProfileMenu = false;


  

  

constructor(private sharedService: SharedService,private categoryservice:Categoryservice, private route:Router,private userServ:Userservice) {}

toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
}
activeCategory: string | null = null;

toggleSubmenu(category: string) {
  this.activeCategory = this.activeCategory === category ? null : category;
}

onSearchChange() {
  this.sharedService.emitSearchTerm(this.sear);
}
category(){
  this.categoryservice.getCategories().subscribe(
    data => { 
      this.categories = data;
      console.log('Categories loaded:', this.categories);
    },
    error => {
      console.error('Error loading categories:', error);
    } 
  );  

}
// searchQuery = '';

//   onSearchChange(term: string) {
//     this.searchQuery = term;
//     // this is used to pass search value to product list component directly
//   }




ngOnInit() {
  this.userServ.user$.subscribe((user) => {
    this.UserData = user;
    this.isLoggedIn = !!user;
    console.log('Updated in AppComponent:', this.isLoggedIn);
  });
}

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  showPersonalInfo() {
    console.log('User Details:', this.UserData);
    // Add route or modal logic here if needed
  }

  logout() {
    this.userServ.clearUser();
    this.isLoggedIn = false;
    this.UserData = null;
    this.showProfileMenu = false;
  }

}
