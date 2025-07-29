import { Component } from '@angular/core';
import { Product } from '../common/product';
import { OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

import { SharedService } from '../services/shared.services';
import { SimpleChanges, Input } from '@angular/core';
@Component({
  selector: 'app-product-list',
  imports: [FormsModule,CommonModule,RouterModule,CommonModule,RouterModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent implements OnInit {
products:Product[] = [];
searchSub: Subscription = new Subscription();
categoryId: number = 0;
constructor(private productService: ProductsService, private cdRef: ChangeDetectorRef
,private route:ActivatedRoute ,private sharedService: SharedService) {}
 @Input() searchTerm: string =" ";

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['searchTerm']) {
  //     this.handleSearch(changes['searchTerm'].currentValue);
  //   }
  // }// it is used to detect changes in searchTerm input property 

 ngOnInit(): void {
//   this.productService.getProducts().subscribe(
//     data => { 
//       this.products = data;
//       console.log('Products loaded:', this.products); 
      
//       this.cdRef.detectChanges(); 
//       //console.log('Product count:', this.products[0].name);
//  })
this.route.paramMap.subscribe(() => {
  this.listProducts();  
});
this.searchSub = this.sharedService.searchTerm$.subscribe(term => {
    this.fetchProducts(term);
  });
 

}


fetchProducts(term: string) {
  this.productService.searchProductBystartsWith(term).subscribe(results => {
    this.products = results;
  });
}

// handleSearch(term: string) {
//   this.productService.searchProductBystartsWith(term).subscribe(results => {
//     this.products = results;
//   });
// }// it is used to pass search value to product list component directly from app component
listProducts(){
  const hasCategoryId = this.route.snapshot.paramMap.has('id');
  console.log('Has category ID:', hasCategoryId);
  if (hasCategoryId) {
  this.categoryId = +this.route.snapshot.paramMap.get('id')!;
  console.log('Category ID:', this.categoryId);
    
  } else {
     this.categoryId=1;
  }
  this.productService.getProductByCategory(this.categoryId).subscribe( 
      data => {
        this.products = data;
        console.log('Products by category loaded:', this.products);
        this.cdRef.detectChanges(); 
      }     
    );
} 

cart: { [productId: number]: number } = {};

addToCart(product: Product) {
  this.cart[product.id] = 1;
}

increaseQuantity(product: Product) {
  this.cart[product.id]++;
}

decreaseQuantity(product: Product) {
  if (this.cart[product.id] > 1) {
    this.cart[product.id]--;
  } else {
    delete this.cart[product.id];
  }
}
}

