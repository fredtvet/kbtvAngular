import { ComponentFactoryResolver, ComponentRef, EventEmitter, Input, Output, Type, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { SaveAction } from 'src/app/core/state';
import { SubscriptionComponent } from 'src/app/shared-app/components';
import { FormComponent } from '../form-component.interface';
import { BaseFormViewComponent } from './base-form-view-component';

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
      this.viewConfig$.pipe(tap(console.log),takeUntil(this.unsubscribe)).subscribe(viewConfig => this.onViewConfigChanges(viewConfig))
    }

    protected get formViewComponent(): Type<TViewComponent>{
      throw "Method not implemented"
    }
 
    protected onViewConfigChanges(viewConfig: TViewConfig): void{
      this.formViewRef.instance.config = viewConfig;
    }

    protected initViewComponent(){
      const factory = this.componentFactoryResolver.resolveComponentFactory(this.formViewComponent);
      this.formViewRef = this.viewContainerRef.createComponent(factory);
      this.formViewRef.instance.formSubmitted.pipe(takeUntil(this.unsubscribe)).subscribe(x => this.onSubmit(x))
    } 

    protected onSubmit(result: TResult): void{
        throw "Method not implemented"
    }

    protected initViewConfig(): Observable<TViewConfig>{
        throw "Method not implemented"
    }

}
  