import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicFormStore } from '@dynamic-forms/dynamic-form.store';
import { Question, OptionsGetter, QuestionComponent } from '@dynamic-forms/interfaces';
import { VALIDATION_ERROR_MESSAGES, ValidationErrorMap } from '@dynamic-forms/validation-error-map.interface';
import { Prop } from '@shared-app/prop.type';
import { BaseQuestionComponent } from '@dynamic-forms/components/base-question.component';

export interface SelectQuestion<T> extends Question {
  optionsGetter: OptionsGetter<T>;
  valueProp?: Prop<T>;
  valueFormatter?: (val: T) => any;
  compareWith?: (o1: any, o2: any) => boolean;
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
        <mat-error *ngIf="control.dirty && control.invalid">
          {{ getValidationErrorMessage() }}
        </mat-error>

    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectQuestionComponent extends BaseQuestionComponent<SelectQuestion<any>> implements QuestionComponent {

  defaultCompareWith = (o1: any, o2: any) => o1 === o2;

  state: Object = this.formStore.formState;

  options$: Observable<any[]>;

  constructor(
    @Inject(VALIDATION_ERROR_MESSAGES) validationErrorMessages: ValidationErrorMap,
    private formStore: DynamicFormStore<any>) { 
    super(validationErrorMessages) 
  }
  
  ngOnInit(): void {
    this.options$ = this.formStore.getOptions$(this.question.optionsGetter)
  }

}
