import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LazyStyles } from 'src/app/shared-app/enums';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CssLoaderService {

    constructor(@Inject(DOCUMENT) private document: Document) {console.log("CssLoaderService");}
  
    loadStyle(styleSheet: LazyStyles) {
      if (this.document.getElementById(styleSheet))  return undefined;
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
