import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/Product-list-component';       
import { Productdetailscomponent } from './productdetailscomponent/productdetailscomponent';
import { Logincomponent } from './logincomponent/logincomponent';
export const routes: Routes = [
    {path:'category/:id', component: ProductListComponent},
    {path:'category/', component: ProductListComponent},
    {path:'products', component: ProductListComponent},
    {path:'products/:id', component: Productdetailscomponent},
    {path:'login', component: Logincomponent },
    {path:'', redirectTo:'/login', pathMatch: 'full'},
    
// {path:'**', redirectTo:'/products', pathMatch: 'full'}

];
