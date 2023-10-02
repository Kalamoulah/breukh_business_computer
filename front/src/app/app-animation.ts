import { trigger, transition, style, animate } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('30000ms', style({ opacity: 1 })),
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate('3000ms', style({ opacity: 1 })),
    ]),
  ]);