import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Optional, Output } from '@angular/core';
import { DynamicForm, FormComponent } from '@dynamic-forms/interfaces';
import { OptionsFormState } from '@form-sheet/interfaces';
import { Immutable, Maybe } from 'global-types';
import { SaveAction } from '@model/interfaces';
import { ModelCommand } from '@model/model-command.enum';
import { StateAction } from '@state/state.action';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, shareReplay, take } from 'rxjs/operators';
import { DEFAULT_SAVE_CONVERTER } from './injection-tokens.const';
import { FormToSaveModelConverter, ModelFormConfig } from './interfaces';
import { ModelFormFacade } from './model-form.facade';

@Component({
    selector: 'app-model-form',
    template: `
      <app-dynamic-form 
        [config]="formConfig$ | async" 
        [formState]="formState$ | async" 
        (formSubmitted)="$event ? onSubmit($event) : onCancel()">
      </app-dynamic-form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelFormComponent 
  implements FormComponent<ModelFormConfig<{}, {}, OptionsFormState<{}>>, OptionsFormState<{}>, SaveAction>{
    @Output() formSubmitted = new EventEmitter<Maybe<SaveAction>>()

    @Input() config: ModelFormConfig<{}, {}, OptionsFormState<{}>>;
   
    @Input('formState') 
    set formState(value: Immutable<OptionsFormState<{}>>) {
      this.formStateSubject.next(value)
    }
  
    private formStateSubject = new BehaviorSubject<OptionsFormState<{}>>({options: {}})

    formState$: Observable<OptionsFormState<{}>>;
    formConfig$: Observable<DynamicForm<{}, OptionsFormState<{}>>>;

    private isCreateForm: boolean = false;
  
    constructor(
      private facade: ModelFormFacade,
      @Inject(DEFAULT_SAVE_CONVERTER) @Optional() private defaultSaveConverter: FormToSaveModelConverter<{}, {}, StateAction>
    ) {}
  
    ngOnInit(): void {  
      this.facade.loadModels(this.config.stateProp); 

      if(!this.config.entityId) this.isCreateForm = true;
    
      this.formState$ = combineLatest([
        this.formStateSubject.asObservable(),
        this.facade.getFormState$(this.config.stateProp)
      ]).pipe(map(([inputFormState, modelFormState]) => {
        return {...modelFormState, ...inputFormState}
      }), shareReplay(1));

      this.formConfig$ = this.facade.getFormState$(this.config.stateProp).pipe(
        filter(x => x != null),take(1), 
        map(state => this.getFormConfig(state.options))
      )
    }

    onSubmit(result: Immutable<{}>): void{   
      const saveAction = this.isCreateForm ? ModelCommand.Create : ModelCommand.Update;
      this.formSubmitted.emit(saveAction);

      const converter = this.config.actionConverter || this.defaultSaveConverter

      this.formState$.pipe(take(1)).subscribe(state => 
        this.facade.save(converter({
          formValue: result, 
          options: state.options,
          stateProp: this.config.stateProp, 
          saveAction, 
        }))
      )    
    }

    onCancel = (): void => this.formSubmitted.emit(null); 

    private getFormConfig(state: Maybe<Immutable<{}>>): DynamicForm<{}, OptionsFormState<{}>>{
      const dynamicForm = this.config.dynamicForm;
      if(dynamicForm.initialValue) return this.config.dynamicForm;
      return {
        ...dynamicForm, 
        initialValue:  this.facade.getModelWithForeigns(<string> this.config.entityId, this.config.stateProp, state || {})
      }
    }
}
  