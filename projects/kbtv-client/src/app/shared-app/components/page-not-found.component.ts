import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
  <span class="h-100" fxLayout="column" fxLayoutAlign="center center">  
      <span class="mat-display-1 m-0">
          404 
      </span>
      <span class="mat-h1">
          Denne siden finnes ikke!
      </span>
  </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent {
    constructor(){}
}
