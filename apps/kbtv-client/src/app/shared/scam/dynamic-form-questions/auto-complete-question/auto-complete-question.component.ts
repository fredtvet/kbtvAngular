import { ChangeDetectionStrategy, Component, Inject, NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { _shouldEagerOptions } from '@shared-app/helpers/should-eager-options.helper';
import { SharedModule } from '@shared/shared.module';
import { BaseQuestionComponent, DynamicFormStore, ValidationErrorMap, VALIDATION_ERROR_MESSAGES } from 'dynamic-forms';
import { Immutable, ImmutableArray, UnknownState } from 'global-types';
import { Observable, of } from 'rxjs';
import { ActiveStringFilterConfig } from '../../../interfaces';
import { AutoCompleteQuestion, AutoCompleteQuestionBindings } from './auto-complete-question.interface';

@Component({
  selector: 'app-autocomplete-question',
  templateUrl: 'auto-complete-question.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoCompleteQuestionComponent<T> 
    extends BaseQuestionComponent<AutoCompleteQuestionBindings<T>, AutoCompleteQuestion<T, object | null>> {

    options$: Observable<ImmutableArray<unknown>>;

    activeFilter: Immutable<ActiveStringFilterConfig<UnknownState>>;

    private get _options$(): Observable<ImmutableArray<unknown>> {
        return this.stateBindings.options || of([])
    }

    constructor(
        @Inject(VALIDATION_ERROR_MESSAGES) validationErrorMessages: ValidationErrorMap,
        formStore: DynamicFormStore<object>) { 
            super(validationErrorMessages,formStore); 
        }

    ngOnInit(): void {
        if(this.question.activeFilter)
            this.activeFilter = {
                ...this.question.activeFilter || {}, 
                stringChanges$: this.control?.valueChanges || of(null)
            }

        if(_shouldEagerOptions(this.question.lazyOptions, this.control)) 
            this.options$ = this._options$;
    }

    triggerOptions(): void{
        if(!this.options$) this.options$ = this._options$;
    }

}

@NgModule({
    declarations: [AutoCompleteQuestionComponent],
    imports:[
      SharedModule,    
      MatFormFieldModule,
      MatInputModule,
    ]
  })
  class AutoCompleteQuestionModule {}