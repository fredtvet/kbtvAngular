import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, Inject, ViewContainerRef } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { take, takeUntil, tap } from 'rxjs/operators';
import { WithUnsubscribe } from 'src/app/shared-app/mixins/with-unsubscribe.mixin';
import { MainTopNavBarComponent } from 'src/app/shared/components/main-top-nav-bar/main-top-nav-bar.component';
import { FormSheetWrapperConfig } from './form-sheet-wrapper-config.interface';

type WrapperConfig = FormSheetWrapperConfig<any, any, any>;

@Component({
    selector: 'app-form-sheet-wrapper',
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSheetWrapperComponent extends WithUnsubscribe() {
    
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef,
        private _bottomSheetRef: MatBottomSheetRef<FormSheetWrapperComponent, any>, 
        @Inject(MAT_BOTTOM_SHEET_DATA) private config: WrapperConfig) { super() }
    
        ngOnInit() {
            this.loadNav();
            this.loadForm();
        }
    
        close = (res: any): void => this._bottomSheetRef.dismiss(res);
        
        private loadNav(){
            const factory = this.componentFactoryResolver.resolveComponentFactory(MainTopNavBarComponent);
            let navRef = this.viewContainerRef.createComponent(factory);
            navRef.instance.color = "transparent";
            navRef.instance.config = {
                backFn: () => this.close(null), 
                backIcon: "close", 
                ...this.config.navConfig
            }; 
        }
    
        private loadForm(){
            const factory = this.componentFactoryResolver.resolveComponentFactory(this.config.formComponent);
            let formRef = this.viewContainerRef.createComponent(factory);
            formRef.instance.config = this.config.formConfig;         
            formRef.location.nativeElement.style.display = "block";
            formRef.location.nativeElement.style.margin = "0px 12px 12px 12px";

            if(this.config.formState$)
                this.config.formState$.pipe(takeUntil(this.unsubscribe))
                    .subscribe(x => formRef.instance.formState = x)

            formRef.instance.formSubmitted.pipe(take(1),
                tap(x => (x && this.config.submitCallback) ? this.config.submitCallback(x) : null),
            ).subscribe(x => this.close(x))
        }
        
}
