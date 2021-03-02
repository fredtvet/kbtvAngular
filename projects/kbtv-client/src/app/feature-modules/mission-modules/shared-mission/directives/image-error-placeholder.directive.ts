import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({selector: '[appImageErrorPlaceholder]'})
export class ImageErrorPlaceholderDirective {

  constructor(private el: ElementRef) {}

  @HostListener('error') onError(): void {
    this.el.nativeElement.src = "/assets/notfound.png?"
  }

}
