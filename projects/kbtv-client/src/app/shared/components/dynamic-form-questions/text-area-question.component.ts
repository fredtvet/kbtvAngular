import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { BaseQuestionComponent, Question, QuestionComponent, ValidationErrorMap, VALIDATION_ERROR_MESSAGES } from 'dynamic-forms';

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

        <mat-error *ngIf="control && control.dirty && control.invalid">
          {{ getValidationErrorMessage() }}
        </mat-error>
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextAreaQuestionComponent extends BaseQuestionComponent<TextAreaQuestion> 
  implements QuestionComponent {

  constructor(@Inject(VALIDATION_ERROR_MESSAGES) validationErrorMessages: ValidationErrorMap) { 
    super(validationErrorMessages) 
  }

}
