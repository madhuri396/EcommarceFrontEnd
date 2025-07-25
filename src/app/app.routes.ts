import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/Product-list-component';       
import { Productdetailscomponent } from './productdetailscomponent/productdetailscomponent';
export const routes: Routes = [
    {path:'category/:id', component: ProductListComponent},
    {path:'category/', component: ProductListComponent},
    {path:'products', component: ProductListComponent},
    {path:'products/:id', component: Productdetailscomponent},
   
    {path:'', redirectTo:'/products', pathMatch: 'full'},
// {path:'**', redirectTo:'/products', pathMatch: 'full'}

];
