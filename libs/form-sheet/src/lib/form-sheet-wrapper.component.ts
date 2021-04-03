import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, Inject, ViewContainerRef } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Subscription } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { FormSheetNavBarComponent } from './form-sheet-nav-bar/form-sheet-nav-bar.component';
import { FormSheetWrapperConfig } from './interfaces';

/** Component responsible for rendering a form component in a material bottom sheet.
 *  Also renders the top navigation bar */
@Component({
    selector: 'lib-form-sheet-wrapper',
    template: ``,
    styleUrls: ['./form-sheet-wrapper.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSheetWrapperComponent  {
    
    private formStateSub: Subscription;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef,
        private _bottomSheetRef: MatBottomSheetRef<FormSheetWrapperComponent, unknown>, 
        @Inject(MAT_BOTTOM_SHEET_DATA) private config: FormSheetWrapperConfig<{}, {}, unknown>) { }
    
    ngOnInit() {
        this.loadNav();
        this.loadForm();
    }
        
    ngOnDestroy(){
        this.formStateSub?.unsubscribe();
    }

    private close = (res: unknown): void => this._bottomSheetRef.dismiss(res);
        
    private loadNav(){
        const factory = this.componentFactoryResolver.resolveComponentFactory(FormSheetNavBarComponent);
        let navRef = this.viewContainerRef.createComponent(factory);
        navRef.instance.config = this.config.navConfig;
        navRef.instance.closed.pipe(first()).subscribe(x => this.close(null));
    }
    
    private loadForm(){
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.config.formComponent);
        let formRef = this.viewContainerRef.createComponent(factory);
        formRef.instance.config = this.config.formConfig;    

        if(this.config.formState$)
            this.formStateSub = 
                this.config.formState$.subscribe(x => formRef.instance.formState = x)

        formRef.instance.formSubmitted.pipe(first(),
            tap(x => (x && this.config.submitCallback) ? this.config.submitCallback(x) : null),
        ).subscribe(x => this.close(x))
    }
        
}
