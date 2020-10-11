import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, Type, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Model } from 'src/app/core/models';
import { BaseFormComponent } from '../../../form/abstracts/base-form.component';
import { CommandDispatcher } from '../../../state/command.dispatcher';
import { StateAction } from '../../../state/state-action.enum';
import { FormToSaveModelStateCommandAdapter } from '../../adapters/form-to-save-model-state-command.adapter';
import { ModelState } from '../../interfaces';
import { SaveModelHttpEffect } from '../../state/save-model/save-model.http.effect';
import { SaveModelReducer } from '../../state/save-model/save-model.reducer';
import { BaseModelFormViewComponent } from '../abstracts/base-model-form-view.component';
import { ModelFormConfig } from '../interfaces/model-form-config.interface';
import { ModelFormViewConfig } from '../interfaces/model-form-view-config.interface';
import { ModelForm } from '../interfaces/model-form.interface';
import { ModelFormStore } from '../model-form.store';

type ViewConfig = ModelFormViewConfig<Model, any>;
type FormConfig = ModelFormConfig<Model, any, ViewConfig>;
type ViewComponent = BaseModelFormViewComponent<any, Model, ViewConfig>;

@Component({
    selector: '',
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelFormComponent extends BaseFormComponent<any, ViewConfig, FormConfig, ViewComponent> implements ModelForm<any>{
  
    private isCreateForm: boolean = false;
    private foreignState: Partial<ModelState>;
  
    constructor(
        protected store: ModelFormStore,
        private commandDispatcher: CommandDispatcher,
        saveModelReducer: SaveModelReducer,
        saveModelHttpEffect: SaveModelHttpEffect, 
        componentFactoryResolver: ComponentFactoryResolver,
        viewContainerRef: ViewContainerRef
    ) { super(componentFactoryResolver, viewContainerRef); }
  
    ngOnInit(): void {        
      if(!this.config.entityId) this.isCreateForm = true;
      super.ngOnInit();
    }

    protected get formViewComponent(): Type<ViewComponent> {
      return this.config.viewComponent;
    }

    protected onSubmit(result: any): void{   
      const saveAction = this.isCreateForm ? StateAction.Create : StateAction.Update;
      this.formSubmitted.emit(saveAction);
      const adapter = this.config.adapter || FormToSaveModelStateCommandAdapter
      const stateCommand = new adapter({
          formState: result, 
          stateProp: this.config.stateProp, 
          saveAction, 
          foreigns: this.foreignState
        })

      this.commandDispatcher.dispatch(stateCommand);   
    }

    protected initViewConfig(): Observable<ViewConfig>{
      if(this.isCreateForm) 
          return this.store.getForeigns$(this.config.stateProp).pipe(
              map(x => {
                this.foreignState = x;
                return {...this.config.viewConfig, foreigns: x, entity: null}
              }),
          );
      else 
          return this.store.getWithForeigns$(this.config.stateProp, this.config.entityId).pipe(
              tap(x => !x ? this.formSubmitted.emit() : null),
              map(x => { 
                this.foreignState = x.foreigns;
                return {...this.config.viewConfig, ...x}
              }),
          );       
    }
}
  