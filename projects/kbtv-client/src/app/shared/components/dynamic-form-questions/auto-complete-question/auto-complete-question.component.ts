import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { BaseQuestionComponent, DynamicFormStore, QuestionComponent, ValidationErrorMap, VALIDATION_ERROR_MESSAGES } from 'dynamic-forms';
import { UnknownState } from 'global-types';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActiveStringFilterConfig } from '../../../interfaces';
import { AutoCompleteQuestion } from './auto-complete-question.interface';

export interface AutoCompleteViewModel { options: unknown[], activeFilter: ActiveStringFilterConfig<UnknownState> }

@Component({
  selector: 'app-autocomplete-question',
  templateUrl: 'auto-complete-question.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoCompleteQuestionComponent extends BaseQuestionComponent<AutoCompleteQuestion<UnknownState>> 
    implements QuestionComponent {

    vm$: Observable<AutoCompleteViewModel>;

    constructor(
        @Inject(VALIDATION_ERROR_MESSAGES) validationErrorMessages: ValidationErrorMap,
        private formStore: DynamicFormStore<UnknownState>) { 
        super(validationErrorMessages) 
    }

    ngOnInit(): void {
        this.vm$ = this.formStore.getOptions$(this.question.optionsGetter).pipe(
            map(options => { return <AutoCompleteViewModel> {
                options,
                activeFilter: {
                    ...this.question.activeFilter, 
                    data: options, 
                    stringChanges$: this.control?.valueChanges || of(null)
                }
            }}),
        )
    }

}
