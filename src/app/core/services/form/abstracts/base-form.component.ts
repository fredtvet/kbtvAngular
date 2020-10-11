import { ComponentFactoryResolver, ComponentRef, EventEmitter, Input, Output, Type, ViewContainerRef, Directive } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SubscriptionComponent } from 'src/app/shared-app/components';
import { SaveAction } from '../../state/interfaces/save-action.interface';
import { FormComponent } from '../interfaces/form-component.interface';
import { BaseFormViewComponent } from './base-form-view-component';

@Directive()
export abstract class BaseFormComponent<  
    TResult,
    TViewConfig,
    TFormConfig,
    TViewComponent extends BaseFormViewComponent<TViewConfig, TResult>
    > extends SubscriptionComponent implements FormComponent{
    
    @Input() config: TFormConfig;
    @Output() formSubmitted = new EventEmitter<SaveAction>();

    protected formViewRef: ComponentRef<TViewComponent>

    private viewConfig$: Observable<TViewConfig>;
  
    constructor(
        protected componentFactoryResolver: ComponentFactoryResolver,
        protected viewContainerRef: ViewContainerRef
    ) { super(); }
  
    ngOnInit(): void {        
      this.viewConfig$ = this.initViewConfig(); 
      this.initViewComponent();
      this.viewConfig$.pipe(takeUntil(this.unsubscribe)).subscribe(viewConfig => this.onViewConfigChanges(viewConfig))
    }

    protected get formViewComponent(): Type<TViewComponent>{
      console.error("Method not implemented");
      return null;
    }
 
    protected onViewConfigChanges(viewConfig: TViewConfig): void{
      this.formViewRef.instance.config = viewConfig;
    }

    protected initViewComponent(){
      const factory = this.componentFactoryResolver.resolveComponentFactory(this.formViewComponent);
      this.formViewRef = this.viewContainerRef.createComponent(factory);
      this.formViewRef.instance.formSubmitted.pipe(takeUntil(this.unsubscribe))
        .subscribe(x => x ? this.onSubmit(x) : this.formSubmitted.emit(null))
    } 

    protected onSubmit(result: TResult): void{
      console.error("Method not implemented");
      return null;
    }

    protected initViewConfig(): Observable<TViewConfig>{
      console.error("Method not implemented");
      return null;
    }

}
  