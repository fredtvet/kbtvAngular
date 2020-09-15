import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { StateAction } from 'src/app/core/state/state-action.enum';
import { SimpleTopNavComponent } from 'src/app/shared/components/simple-top-nav/simple-top-nav.component';
import { SimpleNavConfig } from 'src/app/shared/interfaces/simple-nav-config.interface';
import { FormComponent } from '../form-component.interface';
import { FormSheetWrapperConfig } from '../form-sheet-wrapper-config.interface';
import { FormSheetWrapperResult } from '../form-sheet-wrapper-result.interface';

export abstract class BaseFormSheetWrapperComponent<TWrapperConfig extends FormSheetWrapperConfig<any, FormComponent>> {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private router: Router,
    private _bottomSheetRef: MatBottomSheetRef<BaseFormSheetWrapperComponent<TWrapperConfig>, FormSheetWrapperResult>, 
    protected config: TWrapperConfig) { }

    ngOnInit() {
        this.loadNav();
        this.loadForm();
    }

    close = (action: StateAction) => {
        switch(action){
          case StateAction.Delete: this.navigateTo(this.config?.onDeleteUri, action); break;     
          case StateAction.Update: this.navigateTo(this.config?.onUpdateUri, action); break;     
          case StateAction.Create: this.navigateTo(this.config?.onCreateUri, action); break;
          default: this._bottomSheetRef.dismiss({action, hasNavigated: false});
        }
    } 

    private navigateTo(url: string, action: StateAction){
        let hasUrl = url ? true : false;
        if(hasUrl) this.router.navigate([url]);
        this._bottomSheetRef.dismiss({action, hasNavigated: hasUrl});
    }
    
    private loadNav(){
        const factory = this.componentFactoryResolver.resolveComponentFactory(SimpleTopNavComponent);
        let navRef = this.viewContainerRef.createComponent(factory);
        navRef.instance.config = this.navConfig; 
    }

    protected loadForm(){
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.config.formComponent);
        let formRef = this.viewContainerRef.createComponent(factory);
        formRef.instance.config = this.config.formConfig;
        formRef.instance.formSubmitted.pipe(take(1)).subscribe(x => this.close(x))
    }

    protected get navConfig(): SimpleNavConfig{
        return {
            title: this.config.customTitle,
            leftBtn: {icon: 'close', callback: this.close},
        }
    }
}
