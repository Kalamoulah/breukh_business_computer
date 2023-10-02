import { Component, OnInit, ViewChild } from '@angular/core';
import { VenteService } from '../service/vente.service';
import { tap } from 'rxjs';
import { ListProductComponent } from './list-product/list-product.component';
import { FormProductComponent } from './form-product/form-product.component';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit{
     
  constructor(private _productService: VenteService){ }
  userAuth:any

  ngOnInit(): void {
    const user = localStorage.getItem('userAuth')
    this.userAuth = JSON.parse(user!)
    const idSuccursale = this.userAuth.succursale_id
    
    this.breukh(idSuccursale)
    // this.getAll()    
  }

  @ViewChild(FormProductComponent,{static: false}) secondChild!: FormProductComponent;
  @ViewChild(ListProductComponent,{static: false}) child!: ListProductComponent;

  produits: any
  data:any
   breukh(id:number) {
    this._productService.getProduitBySuccursale(id).pipe(
      tap({
        next: (res: any) => {
          console.log(res);
          console.log( this.child); 
        this.child!.produits = res!.data
        },
        complete: () => {
          console.log('observable terminé');
        },
        error: (err) => {
          console.error("Une erreur s'est produite :", err);
        }
      })
    ).subscribe();
  }




}
