import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Prop } from 'src/app/shared-app/prop.type';
import { DynamicFormStore } from '../dynamic-form.store';
import { OptionsGetter, Question, QuestionComponent } from '../interfaces';
import { BaseQuestionComponent } from './base-question.component';

export interface SelectQuestion<T> extends Question {
  optionsGetter: OptionsGetter<T>;
  defaultOption?: string;
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
            <mat-option *ngIf="question.defaultOption">{{ question.defaultOption }}</mat-option>
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

  constructor(private formStore: DynamicFormStore<any>) { super(); }

  ngOnInit(): void {
    this.options$ = this.formStore.getOptions$(this.question.optionsGetter)
  }

}
