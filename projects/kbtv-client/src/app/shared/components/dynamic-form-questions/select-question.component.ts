import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicFormStore } from '@dynamic-forms/dynamic-form.store';
import { Question, OptionsGetter, QuestionComponent } from '@dynamic-forms/interfaces';
import { VALIDATION_ERROR_MESSAGES, ValidationErrorMap } from '@dynamic-forms/validation-error-map.interface';
import { BaseQuestionComponent } from '@dynamic-forms/components/base-question.component';
import { Maybe, UnknownState, Prop } from 'global-types';

export interface SelectQuestion<T> extends Question {
  optionsGetter: OptionsGetter<T>;
  valueProp?: Prop<T>;
  valueFormatter?: (val: T) => unknown;
  compareWith?: (o1: unknown, o2: unknown) => boolean;
}

@Component({
  selector: 'app-select-question',
  template: `
    <mat-form-field [color]="question.color || 'accent'" class="w-100">
        <mat-label *ngIf="question.label">{{ question.label }}</mat-label>
        <mat-select [placeholder]="question.placeholder" [formControl]="control" [required]="required" [compareWith]="question.compareWith || defaultCompareWith">
            <mat-option *ngIf="!required">Ingen</mat-option>
            <mat-option *ngFor="let option of options$ | async" 
              [value]="question.valueProp ? option[question.valueProp] : option">
                {{ (question.valueFormatter | func : option) || option }}
            </mat-option>
        </mat-select>
        <mat-hint *ngIf="question.hint">{{ question.hint }}</mat-hint>
        <mat-error *ngIf="control && control.dirty && control.invalid">
          {{ getValidationErrorMessage() }}
        </mat-error>

    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectQuestionComponent extends BaseQuestionComponent<SelectQuestion<UnknownState>> implements QuestionComponent {

  defaultCompareWith = (o1: unknown, o2: unknown) => o1 === o2;

  state: Maybe<UnknownState> = this.formStore.formState;

  options$: Observable<unknown[]>;

  constructor(
    @Inject(VALIDATION_ERROR_MESSAGES) validationErrorMessages: ValidationErrorMap,
    private formStore: DynamicFormStore<UnknownState>) { 
    super(validationErrorMessages) 
  }
  
  ngOnInit(): void {
    this.options$ = this.formStore.getOptions$(this.question.optionsGetter)
  }

}
