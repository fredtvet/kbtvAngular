import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActiveStringFilterConfig } from '../../../interfaces';
import { DynamicFormStore } from '../../dynamic-form.store';
import { QuestionComponent } from '../../interfaces';
import { ValidationErrorMap, VALIDATION_ERROR_MESSAGES } from '../../validation-error-map.interface';
import { BaseQuestionComponent } from '../base-question.component';
import { AutoCompleteQuestion } from './auto-complete-question.interface';

export interface AutoCompleteViewModel { options: any[], activeFilter: ActiveStringFilterConfig<any> }

@Component({
  selector: 'app-autocomplete-question',
  templateUrl: 'auto-complete-question.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoCompleteQuestionComponent extends BaseQuestionComponent<AutoCompleteQuestion<any>> 
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
