import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VenteComponent } from './vente/vente.component';
import { ProduitComponent } from './produit/produit.component';
import { ListProductComponent } from './produit/list-product/list-product.component';
import { LoginComponent } from './login/login.component';
import { FormProductComponent } from './produit/form-product/form-product.component';
import { authGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'vente', component: VenteComponent, canActivate: [authGuard] },
  { path: 'list-product', component: ProduitComponent, canActivate: [authGuard] },
  { path: 'list-product/add-product', component: FormProductComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
