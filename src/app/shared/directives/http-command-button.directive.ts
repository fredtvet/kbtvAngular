import { Directive, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from '@core/services/loading.service';
import { BaseLoadingOverlayDirective } from './base-loading-overlay.directive';

@Directive({
  selector: '[appHttpCommandButton]'
})
export class HttpCommandButtonDirective extends BaseLoadingOverlayDirective{

  private loadingSub: Subscription;

  constructor(
    private loadingService: LoadingService,
    elementRef: ElementRef) {
    super();
    this.loadingSub = this.loadingService.commandLoading$.subscribe(loading => {
      if(loading) 
        this.addOverlay(elementRef.nativeElement);
      else
        this.removeOverlay(elementRef.nativeElement);
    })
  }

  ngOnDestroy(): void {
    if(this.loadingSub) this.loadingSub.unsubscribe();
  }

}
