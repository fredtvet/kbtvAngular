import { Directive, ElementRef, Input } from '@angular/core';
import { BaseLoadingOverlayDirective } from './base-loading-overlay.directive';

@Directive({
  selector: '[appLoadingOverlay]'
})
export class LoadingOverlayDirective extends BaseLoadingOverlayDirective{

  constructor(private elementRef: ElementRef) { super() }

  @Input()
  set appLoadingOverlay(loading: boolean) { 
    if(loading) this.addOverlay(this.elementRef.nativeElement)
    else this.removeOverlay(this.elementRef.nativeElement);    
  }

}