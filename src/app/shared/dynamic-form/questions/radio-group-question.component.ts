import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicFormStore } from '../dynamic-form.store';
import { OptionsGetter, Question, QuestionComponent } from '../interfaces';
import { BaseQuestionComponent } from './base-question.component';

export interface RadioGroupQuestion<T> extends Question {
    optionsGetter: OptionsGetter<T>;
    defaultOption?: string;
    valueFormatter?: (val: T) => any;
    valueSetter?: (val: T) => any;
    divider?: boolean;
}

@Component({
  selector: 'app-radio-group-question',
  template: `
    <div class="pb-2">
        <div class="mat-caption" *ngIf="question.label">{{ question.label }}</div>
        <mat-radio-group [formControl]="control" [color]="question.color" fxLayoutGap="8px">
            <mat-radio-button *ngIf="question.defaultOption"
              [checked]="control.value == null">
            {{ question.defaultOption }}
            </mat-radio-button>
            <mat-radio-button *ngFor="let option of options$ | async" 
                [value]="(question.valueSetter | func : option) || option">
                {{ (question.valueFormatter | func : option) || option }}
            </mat-radio-button>
        </mat-radio-group>
        <mat-hint *ngIf="question.hint">{{ question.hint }}</mat-hint>
        <mat-error *ngIf="control.dirty && control.invalid">
          {{ getValidationErrorMessage() }}
        </mat-error>
        <mat-divider *ngIf="question.divider" style="margin-top:8px!important"></mat-divider>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioGroupQuestionComponent extends BaseQuestionComponent<RadioGroupQuestion<any>> 
  implements QuestionComponent {

  hideField: boolean;

  options$: Observable<any[]>;
  
  constructor(private formStore: DynamicFormStore<Object>) { super(); }

  ngOnInit(): void {
    this.options$ = this.formStore.getOptions$(this.question.optionsGetter);
    console.log(this.control.value)
    this.control.valueChanges.subscribe(x => console.log(x))
  }

}
