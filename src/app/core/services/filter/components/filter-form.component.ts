import { ChangeDetectionStrategy, Component, ComponentFactoryResolver,EventEmitter, Inject, Input, Output, Type, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseFormViewComponent } from '../../form/abstracts/base-form-view-component';
import { BaseFormComponent } from '../../form/abstracts/base-form.component';
import { FilterComponent } from '../interfaces/filter-component.interface';
import { FilterConfig } from '../interfaces/filter-config.interface';
import { FilterStore } from '../interfaces/filter-store.interface';
import { FilterViewConfig } from '../interfaces/filter-view-config.interface';

type ViewComponent = BaseFormViewComponent<FilterViewConfig<any>, any>;

@Component({
    selector: '',
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterFormComponent extends BaseFormComponent<any, FilterViewConfig<any>, FilterConfig<any>, ViewComponent> 
    implements FilterComponent<FilterConfig<any>, any>{
    
    @Input() config: FilterConfig<any>;
    @Output() formSubmitted = new EventEmitter<any>();
  
    constructor(
        @Inject("FILTER_STORE") private store: FilterStore<any, FilterViewConfig<any>>,
        componentFactoryResolver: ComponentFactoryResolver,
        viewContainerRef: ViewContainerRef,
    ) { super(componentFactoryResolver, viewContainerRef); }
  

    protected get formViewComponent(): Type<ViewComponent>{
      return this.config.viewComponent;
    }

    protected onSubmit(result: any): void{
        this.formSubmitted.emit(result);
        if(result) this.store.addFilterCriteria(result);  
    }

    protected initViewConfig(): Observable<FilterViewConfig<any>>{
        return this.store.filterConfig$.pipe(map(cfg => {
            return {...this.config.filterConfig, ...cfg}
        }));
    }

}
  