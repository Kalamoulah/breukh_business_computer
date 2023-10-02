import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Product } from 'src/interface/product';
import { VenteService } from '../service/vente.service';
import { tap } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { gsap } from 'gsap';
import { Produit, amis } from 'src/interface/product-beta';
import Swal from 'sweetalert2';
import { ProductItemComponent } from './product-item/product-item.component';
import { AnimationService } from '../service/animation.service';


@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.css']
})
export class VenteComponent implements OnInit, AfterViewInit {

  @ViewChild(ProductItemComponent,{static: false}) child!: ProductItemComponent;
  userAuth: any;

  constructor(private _venteService: VenteService, private animation: AnimationService) { }
  namePage:string = 'vente'
  panierChoice: Product[] = []
  isModalOpen: boolean = false;
  prixTotal: number = 0;
  quantiteProduct: number = 0;
  prixProduct: number = 0
  amis!: amis[]
  productData!: Produit

  // getData() {
  //   this._venteService.all().pipe(
  //     tap({
  //       next: (res: any) => {
  //         this.productData =res.data

  //       },
  //       complete: () => {
  //         console.log('observable terminé');
  //       },
  //       error: (err) => {
  //         console.error("Une erreur s'est produite :", err);
  //       }
  //     })
  //   ).subscribe();
  // }

  commande($event: any) {
    const commande = $event
    console.log(commande);

    this._venteService.vente(commande).pipe(
      tap({
        next: (res: any) => {
          if (res.success) {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            Toast.fire({
              icon: 'success',
              title: res.message
            })
            localStorage.removeItem('userCart');
          }
        },
        complete: () => {
          console.log('observable terminé');
        },
        error: (err) => {
          console.error("Une erreur s'est produite :", err);
        }
      })
    ).subscribe()

  }

  //   search(event : string) {
  //     console.log(event);
  //    this.recherche(event)
  //  }

  search(event: string) {
    const user = localStorage.getItem('userAuth')
    this.userAuth = JSON.parse(user!)
    const succursale_id = this.userAuth.succursale_id
    this._venteService.search(succursale_id, event).pipe(
      tap({
        next: (res: any) => {
          if (res.success) {
            console.log(res);
            // this.productData = res.produit
            this.child.productData = res.produit
            console.log(this.child.productData  );
            this.child.amis= res.amis
            // this.amis = res.amis
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            Toast.fire({
              icon: 'success',
              title: "libelle trouvé"
            })

      
          }
         if(!res.success){
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'error',
            title: res.message
          })
         }
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

  // recherche(code: string) {


  // }

  // recherche(code :string){

  //   this._venteService.search(5, code).pipe(
  //     tap({
  //       next: (res: any) => {

  //         console.log(res.data?.produit);

  //          this.productData = res.produit
  //          this.amis = res.amis
  //          console.log(this.amis);


  //       },
  //       complete: () => {
  //         console.log('observable terminé');
  //       },
  //       error: (err) => {
  //         console.error("Une erreur s'est produite :", err);
  //       }
  //     })
  //   ).subscribe();
  // }

  ngOnInit(): void {
    

    const element1 = document.getElementById('reveal_container'); 
    const element2 = document.getElementById('parent'); 

    if (element1 && element2) {
      console.log('breukh');
      
      this.animation.transitionPage(element1, element2);
    }
  }

  showModal(show: boolean) {
    this.isModalOpen = show;
  }

  productAdd($event: Product[]) {
    this.panierChoice = $event
    this.prixProduct = 0;
    this.quantiteProduct = 0;
    this.prixTotal = 0;

    this.panierChoice?.forEach((item) => {
      this.prixProduct += item.prix;
      this.quantiteProduct += item.quantite!;
      this.prixTotal += item.total!;
    });

    localStorage.setItem('userCart', JSON.stringify(this.panierChoice));
    console.log(this.panierChoice);

  }

  ngAfterViewInit(): void {

  }
}


