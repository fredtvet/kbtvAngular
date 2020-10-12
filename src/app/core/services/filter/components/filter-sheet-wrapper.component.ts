import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, Inject, ViewContainerRef } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { take } from 'rxjs/operators';
import { MainTopNavBarComponent } from 'src/app/shared/components/main-top-nav-bar/main-top-nav-bar.component';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
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

    private close = (criteria: any) => 
        this._bottomSheetRef.dismiss(criteria);

    private loadNav(){
        const factory = this.componentFactoryResolver.resolveComponentFactory(MainTopNavBarComponent);
        let navRef = this.viewContainerRef.createComponent(factory);
        navRef.instance.config = this.navConfig; 
        navRef.instance.stylingClass = "bg-accent mat-elevation-z1";
    }

    protected loadFilter = () => {
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.config.formComponent || FilterFormComponent);
        let filterRef = this.viewContainerRef.createComponent(factory);
        filterRef.instance.config = this.config.formConfig;
        filterRef.instance.formSubmitted.pipe(take(1)).subscribe(x => this.close(x))
    }

    protected get navConfig(): MainTopNavConfig{
        return {
            title: "Velg filtre",
            backFn: this.close,
            backIcon: "close",
        }
    }
}
