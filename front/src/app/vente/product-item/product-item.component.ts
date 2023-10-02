import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { gsap } from 'gsap';
import { Caracteristique, amis } from 'src/interface/product-beta';

import { Produit } from 'src/interface/product-beta';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-item ',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
   searchProductValue: string = ''

  @Input() productData!: Produit | null
  @Input() amis!: amis[]
  @Output() productAdd = new EventEmitter<any>()
  @Output() search = new EventEmitter<string>()
  productShow!: Produit | null
  produitCaract!: Caracteristique[]
  panier: any[] = [];
  showModal: boolean = false
  price: number = 0
  quantite: number = 0
  image: string = 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  quantiteProduit!: number;
  idsuccusale!:number
  
  ngOnInit(): void {
    console.log('Avant récupération du panier');
    const userCartString = localStorage.getItem('userCart');
    console.log('Après récupération du panier');
  
    
    if (userCartString) {
      this.panier = JSON.parse(userCartString);
      console.log(this.panier);
    }
    this.revealAnimation(); 
  }


  searchProduct() {
    console.log(this.searchProductValue);

    // this.image = ""
    this.productShow = null
    this.search.emit(this.searchProductValue)

    // this.productShow = this.productData

    //  this.quantiteProduit = this.productShow?.succursales?.[0]?.quantite

    // if (this.productShow != null && this.searchProductValue != "") {
    //   this.image = 'http://localhost:8000/storage/' + this.productShow?.image
    // } else {
    //   this.productShow = null
    //    this.image = 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80'
    // }
  }

  openModal(value: string, index = 0, idsuccusale: number) {
    if (value == 'acheter') {
      this.price = this.amis[index]?.prix_unitaire
    }
    if (value == 'valider') {
      this.price = this.productData?.succursales?.[index]?.prix_unitaire!
    }
    this.quantiteProduit = this.amis[index]?.quantite 
    console.log( this.quantiteProduit);
    
     if (this.quantiteProduit == 0) {
      this.showModal = true
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'le stock de vos amis sont à sec ',
        
      })
      return
     }
    this.showModal = true

   this.idsuccusale = idsuccusale
    
  }
   
   
  closeModal() {
    this.showModal = false
  }

  // valider() {
  //   let prixProduct = this.price;
  //   let quantiteProduct = this.quantite;
  //   let prixTotal = this.price * this.quantite;
  //   console.log(this.productShow);
 
  //     const newProduct = {
  //       libelle: this.productShow!.libelle,
  //       description: this.productShow!.description,
  //       defaultPrice: this.productShow!,
  //       prix: prixProduct,
  //       // caracteristiques: this.productShow!.caracteristiques,
  //       succursales: this.productShow!,
  //       total: prixTotal,
  //       quantite: quantiteProduct
  //     }
  //     this.panier.push(newProduct);

  //   console.log(this.panier);
  //   this.productAdd.emit(this.panier);
  //   this.showModal = false;
  //   this.searchProductValue = ""
  //   this.productShow = null
  //   this.price = 0
  //   this.quantite = 0
  //   this.quantiteProduit = 1
  // }
  valider() {
  //  console.log(this.productShow);
    const produitActuel = this.productData;
    const produitExistant = this.panier.find(item => item.libelle === produitActuel?.libelle);
  
    if (produitExistant) {

      produitExistant.quantite = +produitExistant.quantite + +this.quantite;
      produitExistant.total = produitExistant.prix * produitExistant.quantite;
    } else {
          const newProduct = {
        idsucc: this.idsuccusale,
        id_produit:produitActuel?.id,
        libelle: produitActuel!.libelle,
        total: this.price * this.quantite,
        quantite: this.quantite,
        prix: this.price,
      }
       console.log(newProduct);
      this.panier.push(newProduct);
    }
  

    this.showModal = false;
    this.searchProductValue = "";
    this.productData = null;
    this.price = 0;
    this.quantite = 0;
    this.quantiteProduit = 1;

    this.productAdd.emit(this.panier);
  
  
  }
  

  productExists(productId: number): number | undefined {
    return this.panier.findIndex(item => item.defaultPrice.id === productId);
  }

  revealAnimation() {
    const tl = gsap.timeline();

      tl.from('.product-anim', { duration: 2, opacity: 0,  width: 0, y: 10 })
      tl.to('.product-anim', { duration: 2, opacity: 1,  y: 0,delay: 1.5, ease: 'power2.out' });

    tl.from('.product-anim-opacity', { duration: 1, opacity: 0, y: 10, delay: -0.3 })
    tl.to('.product-anim-opacity', { duration: 1, opacity: 1, y: 0, ease: 'power2.out' });
  }

}
