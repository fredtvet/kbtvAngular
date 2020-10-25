import { ChangeDetectionStrategy, Component } from '@angular/core';
import {  Question, QuestionComponent } from '../interfaces';
import { BaseQuestionComponent } from './base-question.component';

export interface CheckboxQuestion extends Question {
  text: string;
}

@Component({
  selector: 'app-checkbox-question',
  template: `  
    <div class="mat-caption" *ngIf="question.label">{{ question.label }}</div>
    
    <mat-checkbox
        [color]="question.color" 
        [formControl]="control" 
        [required]="required" >
        {{ question.text }}
    </mat-checkbox>

    <mat-hint *ngIf="question.hint">{{ question.hint }}</mat-hint>

    <mat-error *ngIf="control.dirty && control.invalid">
      {{ getValidationErrorMessage() }}
    </mat-error>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxQuestionComponent extends BaseQuestionComponent<CheckboxQuestion> 
    implements QuestionComponent {

  constructor() { super() }

}