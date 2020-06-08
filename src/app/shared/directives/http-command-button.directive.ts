import { Directive, ElementRef } from '@angular/core';
import { LoadingService } from 'src/app/core/services';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appHttpCommandButton]'
})

export class HttpCommandButtonDirective {

  private loadingSub: Subscription;

  private innerHtml: any;

  private inLoadingState: boolean = false;

  constructor(
    private loadingService: LoadingService,
    elementRef: ElementRef) {

    this.loadingSub = this.loadingService.commandLoading$.subscribe(loading => {
      if(loading) 
        this.setLoadingState(elementRef.nativeElement);
      else if(this.inLoadingState) 
        this.setActiveState(elementRef.nativeElement);
    })
  }

  private setLoadingState(el: any){
    el.disabled = true;
    this.innerHtml = el.innerHTML;
    el.innerHTML = "&nbsp;";
    el.classList.add("spinner");
    this.inLoadingState = true;
  }

  private setActiveState(el: any){
    el.disabled = false;  
    el.classList.remove("spinner");
    el.innerHTML = this.innerHtml;
    this.inLoadingState = false;  
  }
   
  ngOnDestroy = () => {
    if(this.loadingSub) this.loadingSub.unsubscribe();
  }

}
