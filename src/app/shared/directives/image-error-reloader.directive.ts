import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appImageErrorReloader]'
})
export class ImageErrorReloaderDirective {

  @Input() maxRetries = 5;

  private retries = 0;

  constructor(private el: ElementRef) {}

  @HostListener('error') onError() {
    if(this.retries >= this.maxRetries) return false;
    setTimeout(this.resetSrc, 1000)
  }

  private resetSrc = () => {
    this.el.nativeElement.src = this.el.nativeElement.src;
    this.retries++;
  }
}
