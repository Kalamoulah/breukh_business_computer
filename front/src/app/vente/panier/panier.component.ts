import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/interface/product';
import Swal from 'sweetalert2';
import { gsap } from 'gsap';
@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  // @Input() panierChoice: Product[] = []
  @Input() panierChoice: any
  @Output() commande = new EventEmitter<any>()
  productPrice!: number;
  promo: number = 0;
  prixEncaise: number = 0
  openModel: boolean = false;
  loader: boolean = false;
  // patchTotalPrice() {
  //   this.productPrice = 567899  ;
  // }
  ngOnInit(): void {
    this.revealAnimation();
    const userCartString = localStorage.getItem('userCart');
    if (userCartString) {
      this.panierChoice = JSON.parse(userCartString);
    }
  }

  calculateTotal(): number {
    const promotion = this.promo / 100;
    // console.log(promotion);
    let total = 0;
    for (const product of this.panierChoice) {
      total += product.total;
    }
    if (promotion == 0) {
      return total;
    }
    const remise = total * promotion
    return total - remise
  }

  addVente() {
    this.prixEncaise = this.calculateTotal()
    this.openModel = true
    console.log(this.prixEncaise);
  }
  timer() {
  }


  closeModal() {
    this.openModel = false

  }

  commander() {
    this.loader = true;
    setTimeout(() => {
      this.openModel = false
      console.log(this.panierChoice);
      const products = this.panierChoice.map((produit: any) => {
        const { quantite, prix } = produit;
        const idsucc = produit.idsucc
        const id_produit = produit.id_produit
        const promo = 0
        return { idsucc, quantite, prix, promo, id_produit };
      });

      const commande = {
        produits: products,
        promo: this.promo,
        montant: this.calculateTotal(),
        client: 1,
        user: 1
      }

      this.commande.emit(commande)

      this.loader = false;
    }, 2000);
  }

  revealAnimation() {
    const tl = gsap.timeline();
    tl.from('.panier-anim', { duration: 2, width: 0, delay:1.7, opacity: 0, y: 10, })
    tl.to('.panier-anim', { duration: 2, opacity: 1, y: 0, ease: 'power2.out' });

    tl.from('.panier-anim-opacity', { duration: 1, opacity: 0, y: 20, delay: -0.9 })
    tl.to('.panier-anim-opacity', { duration: 1, opacity: 1, y: 0, border: 'none', ease: 'power2.out' });

  }

}
