import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, shareReplay, take } from 'rxjs/operators';
import { ModelState } from 'src/app/core/services/model/interfaces';
import { ModelFormStore } from 'src/app/shared/model-form/model-form.store';
import { SaveModelHttpEffect } from 'src/app/core/services/model/state/save-model/save-model.http.effect';
import { SaveModelReducer } from 'src/app/core/services/model/state/save-model/save-model.reducer';
import { CommandDispatcher } from 'src/app/core/services/state/command.dispatcher';
import { SaveAction } from 'src/app/core/services/state/interfaces';
import { StateAction } from 'src/app/core/services/state/state-action.enum';
import { DynamicForm } from '../../dynamic-form/interfaces';
import { FormToSaveModelStateCommandAdapter } from '../adapters/form-to-save-model-state-command.adapter';
import { ModelFormConfig } from '../interfaces/model-form-config.interface';
import { SaveModelFormState } from '../interfaces/model-form-to-state-command-adapter.interface';
import { FormComponent } from '../../form';

@Component({
    selector: 'app-model-form',
    template: `
      <app-dynamic-form 
        [config]="formConfig$ | async" 
        [formState]="formState$ | async" 
        (formSubmitted)="onSubmit($event)">
      </app-dynamic-form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelFormComponent implements FormComponent<ModelFormConfig<any, any>, SaveModelFormState, SaveAction>{
    @Output() formSubmitted = new EventEmitter<SaveAction>()

    @Input() config: ModelFormConfig<any, any>;
   
    @Input('formState') 
    set formState(value: Object) {
      this.formStateSubject.next(value)
    }
  
    private formStateSubject = new BehaviorSubject<SaveModelFormState>(null)

    formState$: Observable<SaveModelFormState>;
    formConfig$: Observable<DynamicForm<any, SaveModelFormState>>;

    private isCreateForm: boolean = false;
  
    constructor(
        private commandDispatcher: CommandDispatcher,
        private store: ModelFormStore,
        saveModelReducer: SaveModelReducer,
        saveModelHttpEffect: SaveModelHttpEffect, 
    ) {}
  
    ngOnInit(): void {   
      if(!this.config.entityId) this.isCreateForm = true;

      this.formState$ = combineLatest([
        this.formStateSubject.asObservable(),
        this.store.getFormState$(this.config.stateProp)
      ]).pipe(map(([inputFormState, modelFormState]) => {
        return {...modelFormState, ...inputFormState}
      }), shareReplay(1));

      this.formConfig$ = this.formState$.pipe(filter(x => x != null),take(1), 
        map(state => this.getFormConfig(state.foreigns))
      )

    }

    onSubmit(result: any): void{   
      const saveAction = this.isCreateForm ? StateAction.Create : StateAction.Update;
      this.formSubmitted.emit(saveAction);
      const adapter = this.config.adapter || FormToSaveModelStateCommandAdapter

      this.formState$.pipe(take(1)).subscribe(state => {
        const stateCommand = new adapter({
          formState: result, 
          foreigns: state.foreigns,
          stateProp: this.config.stateProp, 
          saveAction, 
        })

        this.commandDispatcher.dispatch(stateCommand); 
      })    
    }

    private getFormConfig(state: Partial<ModelState>): DynamicForm<any, SaveModelFormState>{
      const dynamicForm = this.config.dynamicForm;
      if(dynamicForm.initialValue) return this.config.dynamicForm;
      return {
        ...dynamicForm, 
        initialValue:  this.store.getModelWithForeigns(this.config.entityId, this.config.stateProp, state)
      }
    }
}
  