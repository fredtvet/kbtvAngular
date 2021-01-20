import { Directive, ElementRef, Input, NgZone } from '@angular/core';
import { WithUnsubscribe } from '@shared-app/mixins/with-unsubscribe.mixin';
import { MainSkeletonPresenter } from './main-skeleton.presenter';

@Directive({selector: '[appScrollNavElevationToggler]'})
export class ScrollNavElevationTogglerDirective extends WithUnsubscribe() {

    @Input() togglerDisabled: boolean;

    private prevElevate: boolean;

    constructor(
      private navPresenter: MainSkeletonPresenter,
      private ngZone: NgZone,
      private elRef: ElementRef,   
    ) {  super(); }

    ngOnInit(): void {
        if(this.togglerDisabled) return;
        this.ngZone.runOutsideAngular(() => {
            this.elRef.nativeElement.addEventListener("scroll", () => {
                const shouldElevate = this.elRef.nativeElement.scrollTop > 5;
                if(shouldElevate !== this.prevElevate)
                this.ngZone.run(() => this.navPresenter.toggleElevation(shouldElevate))
                this.prevElevate = shouldElevate;  
            });
        })
    }

}