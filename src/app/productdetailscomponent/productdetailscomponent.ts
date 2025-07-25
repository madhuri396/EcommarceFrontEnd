import { Component } from '@angular/core';
import { Product } from '../common/product';
import { OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service'; 
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productdetailscomponent',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './productdetailscomponent.html',
  styleUrl: './productdetailscomponent.css'
})
export class Productdetailscomponent implements OnInit {

  // This component will handle the display of product details
  // It will receive the product ID from the route and fetch the product details accordingly  
  productId: number = 0;
  product:Product = new Product(0, '', '', '', 0, '', true, 0, new Date(), new Date());  
  constructor(private route: ActivatedRoute, private productService: ProductsService) {}

ngOnInit(): void {
  this.route.paramMap.subscribe(params=>
    {
      this.productId= +params.get('id')!;
      this.getProductDetails();
    });
}

getProductDetails() {
  this.productService.getProductById(this.productId).subscribe(
    data => {
      this.product = data;
      console.log('Product details loaded:', this.product);
    },
    error => {    
      console.error('Error loading product details:', error);

      this.product =   new Product(0, '', '', '', 0, '', true, 0, new Date(), new Date());  ; // Reset product if there's an error
    }
  );
}

}
