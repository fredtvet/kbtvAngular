import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appLoadingOverlay]'
})
export class LoadingOverlayDirective{

  constructor(private elementRef: ElementRef) {}

  @Input()
  set appLoadingOverlay(loading: boolean) {   
    if(loading)  this.createOverlay(this.elementRef.nativeElement)
    else this.createRegular(this.elementRef.nativeElement);    
  }

  private createRegular(el: any){
    el.disabled = false;  
    el.classList.remove("loading-overlay", "spinner");
  }

  private createOverlay(el: any){
    el.disabled = true;  
    el.classList.add("loading-overlay", "spinner");
  }

}