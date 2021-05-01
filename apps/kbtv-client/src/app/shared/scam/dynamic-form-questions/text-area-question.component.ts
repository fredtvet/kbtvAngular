import { ChangeDetectionStrategy, Component, Inject, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AngularMaterialModule } from '@shared/angular-material.module';
import { SharedModule } from '@shared/shared.module';
import { BaseQuestionComponent, Question, QuestionComponent, ValidationErrorMap, VALIDATION_ERROR_MESSAGES } from 'dynamic-forms';

export interface TextAreaQuestion extends Question {
  rows: number;
}

@Component({
  selector: 'app-text-area-question',
  template: `
    <mat-form-field [color]="question.color || 'accent'" class="w-100">
        <mat-label *ngIf="question.label">{{ question.label }}</mat-label>
        
        <textarea matInput 
            [rows]="question.rows"
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
export class TextAreaQuestionComponent extends BaseQuestionComponent<TextAreaQuestion>  {

  constructor(@Inject(VALIDATION_ERROR_MESSAGES) validationErrorMessages: ValidationErrorMap) { 
    super(validationErrorMessages) 
  }

}

@NgModule({
  declarations: [TextAreaQuestionComponent],
  imports:[
    SharedModule,  
    
    MatFormFieldModule,
    MatInputModule,    
  ]
})
class TextAreaQuestionModule {}