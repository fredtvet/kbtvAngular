import { ComponentFactoryResolver, Directive, ViewContainerRef } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { MainTopNavBarComponent } from 'src/app/shared/components/main-top-nav-bar/main-top-nav-bar.component';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { StateAction } from '../../state/state-action.enum';
import { FormComponent } from '../interfaces/form-component.interface';
import { FormSheetWrapperConfig } from '../interfaces/form-sheet-wrapper-config.interface';
import { FormSheetWrapperResult } from '../interfaces/form-sheet-wrapper-result.interface';

@Directive()
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
        const factory = this.componentFactoryResolver.resolveComponentFactory(MainTopNavBarComponent);
        let navRef = this.viewContainerRef.createComponent(factory);
        navRef.instance.config = this.navConfig; 
        navRef.instance.stylingClass = "mat-elevation-z1";
        navRef.instance.color = "accent"
    }

    protected loadForm(){
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.config.formComponent);
        let formRef = this.viewContainerRef.createComponent(factory);
        formRef.instance.config = this.config.formConfig;
        formRef.instance.formSubmitted.pipe(take(1)).subscribe(x => this.close(x))
    }

    protected get navConfig(): MainTopNavConfig{
        return {
            title: this.config.customTitle,
            backFn: () => this.close(null),
            backIcon: "close",
        }
    }
}
