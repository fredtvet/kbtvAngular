import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appImageErrorReloader]'
})
export class ImageErrorReloaderDirective {

  @Input() maxRetries: number = 5;

  private retries: number = 0;

  constructor(private el: ElementRef) {}

  @HostListener('error') onError(): void {
    if(this.retries >= this.maxRetries) return;
    setTimeout(this.resetSrc, 2000)
  }

  private resetSrc = (): void => {
    this.el.nativeElement.src = this.el.nativeElement.src;
    this.retries++;
  }
}
