import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VenteComponent } from './vente/vente.component';
import { PanierComponent } from './vente/panier/panier.component';
import { ProductItemComponent } from './vente/product-item/product-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ProduitComponent } from './produit/produit.component';
import { FormProductComponent } from './produit/form-product/form-product.component';
import { ListProductComponent } from './produit/list-product/list-product.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    VenteComponent,
    PanierComponent,
    ProductItemComponent,
    ProduitComponent,
    FormProductComponent,
    ListProductComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SweetAlert2Module,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
