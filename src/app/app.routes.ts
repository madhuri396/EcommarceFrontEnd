import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/Product-list-component';       
import { Productdetailscomponent } from './productdetailscomponent/productdetailscomponent';
import { Logincomponent } from './logincomponent/logincomponent';
import { Cartcomponent } from './cartcomponent/cartcomponent';
import { Registercomponent } from './registercomponent/registercomponent';
import { AddressComponent } from './addresscomponent/addresscomponent';
export const routes: Routes = [
    {path:'category/:id', component: ProductListComponent},
    {path:'category/', component: ProductListComponent},
    {path:'products', component: ProductListComponent},
    {path:'products/:id', component: Productdetailscomponent},
    {path:'login', component: Logincomponent },
    {path:'register', component: Registercomponent },
    {path:'addresses', component: AddressComponent },
     {path: 'cart', component: Cartcomponent },
    {path:'', redirectTo:'/products', pathMatch: 'full'},
    
// {path:'**', redirectTo:'/products', pathMatch: 'full'}

];
