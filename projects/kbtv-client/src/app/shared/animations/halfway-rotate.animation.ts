import {
    style,
    animate,
    trigger,
    state,
    transition,
  } from "@angular/animations";

export const halfwayRotate =  trigger('halfwayRotate', [
    state('false', 
      style({ transform: 'rotate(0deg)'  }),
    ),
    state('true', 
      style({ transform: 'rotate(180deg)'  }),
    ),
    transition('* => *', animate('200ms ease-out')),
]);   
