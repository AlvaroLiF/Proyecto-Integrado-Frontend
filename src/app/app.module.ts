import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { ProductCardComponent } from './components/product-card/product-card.component'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { SearchResultComponent } from './pages/search-result/search-result.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { HeaderOrderComponent } from './components/header-order/header-order.component';
import { AddressComponent } from './pages/address/address.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ResumeComponent } from './pages/resume/resume.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { UserOrdersComponent } from './pages/user-orders/user-orders.component';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryProductsComponent } from './pages/category-products/category-products.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ResetPasswordRequestComponent } from './pages/reset-password-request/reset-password-request.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { ShippingAddressCardComponent } from './components/shipping-address-card/shipping-address-card.component';
import { ShippingAddressModalComponent } from './components/shipping-address-modal/shipping-address-modal.component';
import { AddressesComponent } from './pages/addresses/addresses.component';
import { PaymentMethodCardComponent } from './components/payment-method-card/payment-method-card.component';
import { PaymentMethodModalComponent } from './components/payment-method-modal/payment-method-modal.component';
import { BillingAddressModalComponent } from './components/billing-address-modal/billing-address-modal.component';
import { ProductManagementComponent } from './pages/product-management/product-management.component';



registerLocaleData(localeEs, 'es', localeEsExtra);

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CartComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    ProductCardComponent,
    AdminHomeComponent,
    SearchResultComponent,
    SearchBarComponent,
    HeaderComponent,
    FooterComponent,
    CartPageComponent,
    HeaderOrderComponent,
    AddressComponent,
    PaymentComponent,
    ResumeComponent,
    UserManagementComponent,
    UserOrdersComponent,
    CategoriesComponent,
    CategoryProductsComponent,
    ProfileComponent,
    ResetPasswordRequestComponent,
    ResetPasswordComponent,
    ShippingAddressCardComponent,
    ShippingAddressModalComponent,
    AddressesComponent,
    PaymentMethodCardComponent,
    PaymentMethodModalComponent,
    BillingAddressModalComponent,
    ProductManagementComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule

  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
