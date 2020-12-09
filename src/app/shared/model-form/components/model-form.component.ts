import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { DynamicForm, FormComponent } from '@dynamic-forms/interfaces';
import { ModelCommand } from '@model/model-command.enum';
import { SaveAction } from '@model/state/save-model/save-model-action.const';
import { OptionsFormState } from '@shared/form';
import { Optional } from 'ag-grid-community';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, shareReplay, take } from 'rxjs/operators';
import { DEFAULT_SAVE_ADAPTER } from '../injection-tokens.const';
import { ModelFormConfig } from '../interfaces/model-form-config.interface';
import { ModelFormToSaveStateCommandAdapter } from '../interfaces/model-form-to-state-command-adapter.interface';
import { ModelFormFacade } from '../model-form.facade';

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
export class ModelFormComponent implements FormComponent<ModelFormConfig<any, any, OptionsFormState<any>>, OptionsFormState<any>, SaveAction>{
    @Output() formSubmitted = new EventEmitter<SaveAction>()

    @Input() config: ModelFormConfig<any, any, OptionsFormState<any>>;
   
    @Input('formState') 
    set formState(value: Object) {
      this.formStateSubject.next(value)
    }
  
    private formStateSubject = new BehaviorSubject<OptionsFormState<any>>(null)

    formState$: Observable<OptionsFormState<any>>;
    formConfig$: Observable<DynamicForm<any, OptionsFormState<any>>>;

    private isCreateForm: boolean = false;
  
    constructor(
      private facade: ModelFormFacade,
      @Inject(DEFAULT_SAVE_ADAPTER) @Optional() private defaultSaveAdapter: ModelFormToSaveStateCommandAdapter<any, any>
    ) {}
  
    ngOnInit(): void {   
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

    onSubmit(result: any): void{   
      const saveAction = this.isCreateForm ? ModelCommand.Create : ModelCommand.Update;
      this.formSubmitted.emit(saveAction);
      const adapter = this.config.adapter || this.defaultSaveAdapter

      this.formState$.pipe(take(1)).subscribe(state => {
        const stateCommand = new adapter({
          formValue: result, 
          options: state.options,
          stateProp: this.config.stateProp, 
          saveAction, 
        })

        this.facade.save(stateCommand); 
      })    
    }

    onCancel = (): void => this.formSubmitted.emit(null); 

    private getFormConfig(state: Readonly<any>): DynamicForm<any, OptionsFormState<any>>{
      const dynamicForm = this.config.dynamicForm;
      if(dynamicForm.initialValue) return this.config.dynamicForm;
      return {
        ...dynamicForm, 
        initialValue:  this.facade.getModelWithForeigns(this.config.entityId, this.config.stateProp, state)
      }
    }
}
  