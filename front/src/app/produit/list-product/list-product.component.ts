import { Component, Input, OnInit } from '@angular/core';
import { fadeAnimation } from 'src/app/app-animation'

import { AnimationService } from 'src/app/service/animation.service';
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
  animations: [fadeAnimation],
})
export class ListProductComponent implements OnInit {

  produits: any[] = []
  namePage: string = 'liste produit'
   constructor(private animation: AnimationService){}

  imprimer() {
    console.log(this.produits);

  }

  ngOnInit(): void {

    
    const element1 = document.getElementById('reveal_container'); 
    const element2 = document.getElementById('parent'); 

    if (element1 && element2) {

      this.animation.transitionPage(element1, element2);
    }
  }
}


 

