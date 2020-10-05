import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { take } from 'rxjs/operators';
import { SimpleTopNavComponent } from 'src/app/shared/components';
import { SimpleNavConfig } from 'src/app/shared/components/simple-top-nav/simple-nav-config.interface';
import { FilterSheetWrapperConfig } from '../../filter/interfaces/filter-sheet-wrapper-config.interface';
import { FilterFormComponent } from './filter-form.component';

@Component({
    selector: '',
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterSheetWrapperComponent {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private _bottomSheetRef: MatBottomSheetRef<FilterSheetWrapperComponent, any>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private config: FilterSheetWrapperConfig<any>) { }

    ngOnInit() {       
        this.loadNav();
        this.loadFilter();
    }

    private close(criteria: any){
        this._bottomSheetRef.dismiss(criteria);
    } 

    private loadNav(){
        const factory = this.componentFactoryResolver.resolveComponentFactory(SimpleTopNavComponent);
        let navRef = this.viewContainerRef.createComponent(factory);
        navRef.instance.config = this.navConfig; 
    }

    protected loadFilter = () => {
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.config.formComponent || FilterFormComponent);
        let filterRef = this.viewContainerRef.createComponent(factory);
        filterRef.instance.config = this.config.formConfig;
        filterRef.instance.formSubmitted.pipe(take(1)).subscribe(x => this.close(x))
    }

    protected get navConfig(): SimpleNavConfig{
        return {
            title: "Velg filtre",
            leftBtn: {icon: 'close', callback: this.close},
        }
    }
}
