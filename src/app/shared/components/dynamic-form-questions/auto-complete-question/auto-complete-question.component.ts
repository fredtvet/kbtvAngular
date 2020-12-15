import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DynamicFormStore } from '@dynamic-forms/dynamic-form.store';
import { QuestionComponent } from '@dynamic-forms/interfaces';
import { VALIDATION_ERROR_MESSAGES, ValidationErrorMap } from '@dynamic-forms/validation-error-map.interface';
import { ActiveStringFilterConfig } from '../../../interfaces';
import { BaseQuestionComponent } from '@dynamic-forms/components/base-question.component';
import { AutoCompleteQuestion } from './auto-complete-question.interface';

export interface AutoCompleteViewModel { options: unknown[], activeFilter: ActiveStringFilterConfig<unknown> }

@Component({
  selector: 'app-autocomplete-question',
  templateUrl: 'auto-complete-question.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoCompleteQuestionComponent extends BaseQuestionComponent<AutoCompleteQuestion<unknown>> 
    implements QuestionComponent {

    vm$: Observable<AutoCompleteViewModel>;

    constructor(
        @Inject(VALIDATION_ERROR_MESSAGES) validationErrorMessages: ValidationErrorMap,
        private formStore: DynamicFormStore<Object>) { 
        super(validationErrorMessages) 
    }

    ngOnInit(): void {
        this.vm$ = this.formStore.getOptions$(this.question.optionsGetter).pipe(
            map(options => { return {
                options,
                activeFilter: {
                    ...this.question.activeFilter, 
                    data: options, 
                    stringChanges$: this.control.valueChanges 
                }
            }}),
        )
    }

}
