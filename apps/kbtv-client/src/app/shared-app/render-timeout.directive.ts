import { ChangeDetectorRef, Directive } from '@angular/core';

@Directive({selector: '[appRenderTimeout]'})
export class RenderTimeoutDirective {

  constructor(cdRef: ChangeDetectorRef) { 
    cdRef.detach();
    setTimeout(() => {
        cdRef.reattach();
        cdRef.markForCheck();
    })
  }

}
