import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, ViewContainerRef, Type } from '@angular/core';
import { Model } from 'src/app/core/models';
import { SaveModelStateCommand } from '../../interfaces/save-model-state-command.interface';
import { BaseModelFormViewComponent } from '../abstracts/base-model-form-view.component';
import { BaseModelFormComponent } from '../abstracts/base-model-form.component';
import { GenericModelFormConfig } from '../interfaces/generic-model-form-config.interface';
import { ModelFormViewConfig } from '../interfaces/model-form-view-config.interface';
import { ModelForm } from '../interfaces/model-form.interface';
import { ModelFormStore } from '../model-form.store';

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
  