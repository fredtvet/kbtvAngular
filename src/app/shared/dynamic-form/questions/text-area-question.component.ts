import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Question, QuestionComponent } from '../interfaces';
import { BaseQuestionComponent } from './base-question.component';

export interface TextAreaQuestion extends Question {
  minRows: number;
}

@Component({
  selector: 'app-text-area-question',
  template: `
    <mat-form-field [color]="question.color || 'accent'" class="w-100">
        <mat-label *ngIf="question.label">{{ question.label }}</mat-label>
        
        <textarea matInput cdkTextareaAutosize #autosize="cdkTextareaAutosize" 
            [cdkAutosizeMinRows]="question.minRows"
            [placeholder]="question.placeholder" 
            [formControl]="control" 
            [required]="required">
        </textarea> 

        <mat-hint *ngIf="question.hint">{{ question.hint }}</mat-hint>

        <mat-error *ngIf="control.dirty && control.invalid">
          {{ getValidationErrorMessage() }}
        </mat-error>
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextAreaQuestionComponent extends BaseQuestionComponent<TextAreaQuestion> 
  implements QuestionComponent {

  constructor() { super() }

}
