import { Directive, ElementRef, Input } from '@angular/core';

@Directive({selector: '[appImageRatioResizer]'})
export class ImageRatioResizerDirective {

  private _hasViewInit: boolean = false;
  private _imageRatio: number;

  @Input()
  set appImageRatioResizer(ratio: number) { 
    if(ratio === this._imageRatio) return;
    this._imageRatio = ratio;
    if(this._hasViewInit === true) this.setHeight(); 
  }

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.setHeight(); 
    this._hasViewInit = true;
  }

  private setHeight(){
    const el = <HTMLElement> this.elementRef.nativeElement;

    if(!this._imageRatio || el.offsetWidth === 0) return;
    
    el.style.display = "inline-block";
  
    el.style.minHeight = `calc(${el.offsetWidth}px / ${this._imageRatio})`;
 
  }

}