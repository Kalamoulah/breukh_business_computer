import { Injectable } from '@angular/core';
import { gsap } from 'gsap';
@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor() { }

  transitionPage(element1: HTMLElement, element2: HTMLElement) {
    const tl = gsap.timeline();
    tl.to(element1, { x: '0%',width:"100%", duration: 2.3, opacity:1,ease:'power2.out'});
    tl.to(element1, {
      x: '100%',duration: 2.3, ease:'power2.out', display:'none',
      onComplete: () => {
        gsap.to(element2, { opacity: 1 });
      },
    },
      
    );
  }
}
