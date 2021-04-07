import { Directive, ElementRef, Input } from '@angular/core';
import { _isNullOrEmpty } from '@shared-app/helpers/is-null-or-empty.helper';

@Directive({selector: '[appHide]'})
export class HideDirective {

  constructor(private elementRef: ElementRef) { 
    this.originalDisplay = elementRef.nativeElement.style.display;
  }

  private originalDisplay: string;

  private currHidden: boolean = false;

  @Input()
  set appHide(hide: boolean) { 
    if((hide || hide.toString() === "") && !this.currHidden) this.elementRef.nativeElement.style.display = "none";
    else if(!hide && this.currHidden) this.elementRef.nativeElement.style.display = this.originalDisplay;  
    this.currHidden = hide;
  }

}