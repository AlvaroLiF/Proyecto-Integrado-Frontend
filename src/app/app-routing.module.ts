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
import { UserOrdersComponent } from './pages/user-orders/user-orders.component';
import { CategoryProductsComponent } from './pages/category-products/category-products.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ResetPasswordRequestComponent } from './pages/reset-password-request/reset-password-request.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'admin-home', component: AdminHomeComponent, canActivate: [AdminGuard] },
  { path: 'admin-home/add-product', component: AddProductComponent, canActivate: [AdminGuard] },
  { path: 'admin-home/edit-product', component: EditProductComponent, canActivate: [AdminGuard] },
  { path: 'admin-home/delete-product', component: DeleteProductComponent, canActivate: [AdminGuard] },
  { path: 'admin-home/user-management', component: UserManagementComponent, canActivate: [AdminGuard] },
  { path: 'search', component: SearchResultComponent },
  { path: 'user/cart', component: CartPageComponent, canActivate: [AuthGuard] },
  { path: 'order/address', component: AddressComponent, canActivate: [AuthGuard] },
  { path: 'order/payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'order/resume', component: ResumeComponent, canActivate: [AuthGuard] },
  { path: 'user/orders', component: UserOrdersComponent, canActivate: [AuthGuard] },
  { path: 'category/:categoryName', component: CategoryProductsComponent },
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'reset-password-request', component: ResetPasswordRequestComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
