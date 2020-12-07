import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Question, QuestionComponent } from '@dynamic-forms/interfaces';
import { VALIDATION_ERROR_MESSAGES, ValidationErrorMap } from '@dynamic-forms/validation-error-map.interface';
import { BaseQuestionComponent } from '@dynamic-forms/components/base-question.component';

export interface CheckboxQuestion extends Question {
  text: string;
}

@Component({
  selector: 'app-checkbox-question',
  template: `  
    <div class="mat-body" *ngIf="question.label">{{ question.label }}</div>
    
    <mat-checkbox
        [color]="question.color || 'accent'" 
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

  constructor(@Inject(VALIDATION_ERROR_MESSAGES) validationErrorMessages: ValidationErrorMap) { 
    super(validationErrorMessages) 
  }

}
