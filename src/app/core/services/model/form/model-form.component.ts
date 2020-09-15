import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, ViewContainerRef, Type, Inject } from '@angular/core';
import { BaseModelFormComponent, ModelForm, ModelFormViewConfig, GenericModelFormConfig, BaseModelFormViewComponent} from 'src/app/core/model/form';
import { SaveModelStateCommand } from 'src/app/core/model/interfaces';
import { Model } from 'src/app/core/models';
import { ModelFormStore } from './model-form.store';

type SaveCommand = SaveModelStateCommand<Model>;
type ViewConfig = ModelFormViewConfig<Model, any>;
type FormConfig = GenericModelFormConfig<Model, any, ViewConfig>;
type ViewComponent = BaseModelFormViewComponent<any, Model, ViewConfig, SaveCommand>;

@Component({
    selector: '',
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelFormComponent extends BaseModelFormComponent<Model, any, SaveCommand, ViewConfig, FormConfig, ViewComponent>
    implements ModelForm<any>{
  
    constructor(
        store: ModelFormStore,
        componentFactoryResolver: ComponentFactoryResolver,
        viewContainerRef: ViewContainerRef
    ) { super(store, componentFactoryResolver, viewContainerRef); 
    }
    
    protected get formViewComponent(): Type<ViewComponent>{
      return this.config.viewComponent;
    }
}
  