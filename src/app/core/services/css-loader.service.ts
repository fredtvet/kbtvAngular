import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LazyStyles } from '@shared-app/enums';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CssLoaderService {

    constructor(@Inject(DOCUMENT) private document: Document) {}
  
    load(styleSheet: LazyStyles): void {
      if (this.document.getElementById(styleSheet)) return;
      else {     
        const head = this.document.getElementsByTagName('head')[0];
        const style = this.document.createElement('link');
        style.id = styleSheet;
        style.rel = 'stylesheet';
        style.href = `${environment.baseUrl}/${styleSheet}.css`;
 
  
        head.appendChild(style);
      }
    } 
}
