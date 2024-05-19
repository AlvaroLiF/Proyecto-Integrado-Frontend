import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { SearchResultComponent } from './pages/search-result/search-result.component';
import { AuthGuard } from './guards/auth.guard';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { AddressComponent } from './pages/address/address.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ResumeComponent } from './pages/resume/resume.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { DeleteProductComponent } from './pages/delete-product/delete-product.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';

const routes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'admin-home', component: AdminHomeComponent, canActivate: [AuthGuard] },
  { path: 'admin-home/add-product', component: AddProductComponent, canActivate: [AuthGuard] },
  { path: 'admin-home/edit-product', component: EditProductComponent, canActivate: [AuthGuard] },
  { path: 'admin-home/delete-product', component: DeleteProductComponent, canActivate: [AuthGuard] },
  { path: 'admin-home/user-management', component: UserManagementComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchResultComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'order/address', component: AddressComponent },
  { path: 'order/payment', component: PaymentComponent },
  { path: 'order/resume', component: ResumeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
