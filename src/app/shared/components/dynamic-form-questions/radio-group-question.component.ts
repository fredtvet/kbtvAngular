import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicFormStore } from '@dynamic-forms/dynamic-form.store';
import { Question, OptionsGetter, QuestionComponent } from '@dynamic-forms/interfaces';
import { VALIDATION_ERROR_MESSAGES, ValidationErrorMap } from '@dynamic-forms/validation-error-map.interface';
import { BaseQuestionComponent } from '@dynamic-forms/components/base-question.component';

export interface RadioGroupQuestion<T> extends Question {
    optionsGetter: OptionsGetter<T>;
    defaultOption?: string;
    valueFormatter?: (val: T) => unknown;
    valueSetter?: (val: T) => unknown;
    divider?: boolean;
}

@Component({
  selector: 'app-radio-group-question',
  template: `
    <div class="pb-2">
        <div class="mat-body" *ngIf="question.label">{{ question.label }}</div>
        <mat-radio-group [formControl]="control" [color]="question.color || 'accent'" fxLayoutGap="8px">
            <mat-radio-button *ngIf="question.defaultOption"
              [checked]="control?.value == null">
            {{ question.defaultOption }}
            </mat-radio-button>
            <mat-radio-button *ngFor="let option of options$ | async" 
                [value]="(question.valueSetter | func : option) || option">
                {{ (question.valueFormatter | func : option) || option }}
            </mat-radio-button>
        </mat-radio-group>
        <mat-hint *ngIf="question.hint">{{ question.hint }}</mat-hint>
        <mat-error *ngIf="control && control.dirty && control.invalid">
          {{ getValidationErrorMessage() }}
        </mat-error>
        <mat-divider *ngIf="question.divider" style="margin-top:8px!important"></mat-divider>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioGroupQuestionComponent extends BaseQuestionComponent<RadioGroupQuestion<unknown>> 
  implements QuestionComponent {

  hideField: boolean;

  options$: Observable<unknown[]>;
  
  constructor(
    @Inject(VALIDATION_ERROR_MESSAGES) validationErrorMessages: ValidationErrorMap,
    private formStore: DynamicFormStore<Object>) { 
    super(validationErrorMessages) 
  }

  ngOnInit(): void {
    this.options$ = this.formStore.getOptions$(this.question.optionsGetter);
  }

}
