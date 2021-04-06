import { ChangeDetectionStrategy, Component, Inject, NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '@shared/shared.module';
import { BaseQuestionComponent, DynamicFormStore, QuestionComponent, ValidationErrorMap, VALIDATION_ERROR_MESSAGES } from 'dynamic-forms';
import { Immutable, ImmutableArray, UnknownState } from 'global-types';
import { Observable, of } from 'rxjs';
import { ActiveStringFilterConfig } from '../../../interfaces';
import { AutoCompleteQuestion } from './auto-complete-question.interface';

@Component({
  selector: 'app-autocomplete-question',
  templateUrl: 'auto-complete-question.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoCompleteQuestionComponent extends BaseQuestionComponent<AutoCompleteQuestion<UnknownState>> 
    implements QuestionComponent {

    options$: Observable<ImmutableArray<unknown>>;

    activeFilter: Immutable<ActiveStringFilterConfig<UnknownState>>;

    constructor(
        @Inject(VALIDATION_ERROR_MESSAGES) validationErrorMessages: ValidationErrorMap,
        private formStore: DynamicFormStore<UnknownState>) { 
            super(validationErrorMessages); 
        }

    ngOnInit(): void {
        if(this.question.activeFilter)
            this.activeFilter = {
                ...this.question.activeFilter || {}, 
                stringChanges$: this.control?.valueChanges || of(null)
            }

        this.options$ = this.formStore.getOptions$(this.question.optionsGetter);
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