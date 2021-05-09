import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicForm, FormComponent } from 'dynamic-forms';
import { Immutable, Maybe, UnknownState } from 'global-types';
import { UnknownModelState, _getModel} from 'model/core';
import { ModelCommand, SaveAction } from 'model/state-commands';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, shareReplay, take } from 'rxjs/operators';
import { _formToSaveModelConverter } from './form-to-save-model-converter.helper';
import { ModelFormConfig, ModelFormState } from './interfaces';
import { ModelFormFacade } from './model-form.facade';

@Component({
    selector: 'app-model-form',
    template: `
      <lib-dynamic-form 
        [config]="formConfig$ | async" 
        [formState]="formState$ | async" 
        (formSubmitted)="$event ? onSubmit($event) : onCancel()">
      </lib-dynamic-form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelFormComponent
  implements FormComponent<ModelFormConfig<object, object> & {entityId?: unknown}, object, SaveAction>{
    @Output() formSubmitted = new EventEmitter<Maybe<SaveAction>>()

    @Input() config: Maybe<Immutable<ModelFormConfig<object, object> & {entityId?: unknown}>>;

    @Input('formState')
    set formState(value: Maybe<Immutable<object>>) {
      if(value) this.formStateSubject.next(value)
    }
  
    private formStateSubject = new BehaviorSubject<object>({})

    formState$: Observable<Immutable<ModelFormState<object>>>;
    formConfig$: Observable<Immutable<DynamicForm<object, object>>>;

    private isCreateForm: boolean = false;
  
    constructor(private facade: ModelFormFacade<UnknownModelState, UnknownState>) {}
  
    ngOnInit(): void { 
      if(!this.config) return
      this.facade.loadModels(this.config.includes); 

      if(!this.config.entityId) this.isCreateForm = true;
    
      this.formState$ = combineLatest([
        this.formStateSubject.asObservable(),
        this.facade.getFormState$(this.config.includes)
      ]).pipe(map(([inputFormState, modelFormState]) => {
        return {...inputFormState, options: (<ModelFormState<object>>inputFormState).options ? 
            {...modelFormState.options, ...(<ModelFormState<object>>inputFormState).options} : 
            modelFormState.options
        }
      }), shareReplay(1));

      this.formConfig$ = this.facade.getFormState$(this.config.includes).pipe(
        filter(x => x != null),take(1), 
        map(state => this.getFormConfig(state.options))
      )
    }

    onSubmit(result: Immutable<{}>): void{   
      const saveAction = this.isCreateForm ? ModelCommand.Create : ModelCommand.Update;
      this.formSubmitted.emit(saveAction);

      setTimeout(() => {
        const converter = this.config!.actionConverter || _formToSaveModelConverter

        this.formState$.pipe(take(1)).subscribe(state =>
          this.facade.save(converter({
            formValue: result, 
            options: state.options,
            stateProp: this.config!.includes.prop, 
            saveAction, 
          }))
        ) 
      }) 
    }

    onCancel = (): void => this.formSubmitted.emit(null); 

    private getFormConfig(state: Maybe<Immutable<object>>): Immutable<DynamicForm<object, object>>{
      const dynamicForm = this.config!.dynamicForm;
      let initialValue = null;

      if(this.config!.entityId){
        const model = state ? _getModel<object,object>(state, this.config!.entityId, this.config!.includes) : null;
        if(model) initialValue = this.config!.modelConverter! ? this.config!.modelConverter(model) : model;
      }
      
      if(!initialValue) return this.config!.dynamicForm;
      return {
        ...dynamicForm, 
        initialValue: dynamicForm.initialValue ? 
          {...initialValue, ...dynamicForm.initialValue} : 
          initialValue
      }
    }
}
  