import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DynamicFormStore } from 'src/app/dynamic-forms/dynamic-form.store';
import { QuestionComponent } from 'src/app/dynamic-forms/interfaces';
import { VALIDATION_ERROR_MESSAGES, ValidationErrorMap } from 'src/app/dynamic-forms/validation-error-map.interface';
import { ActiveStringFilterConfig } from '../../../interfaces';
import { BaseQuestionComponent } from '../../../../dynamic-forms/components/base-question.component';
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
