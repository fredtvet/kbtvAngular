import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ChangeDetectionStrategy, Component, Inject, NgZone, ViewChild } from '@angular/core';
import { BaseQuestionComponent, Question, QuestionComponent, ValidationErrorMap, VALIDATION_ERROR_MESSAGES } from 'dynamic-forms';
import { take } from 'rxjs/operators';

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
export class TextAreaQuestionComponent extends BaseQuestionComponent<TextAreaQuestion> 
  implements QuestionComponent {

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(
    @Inject(VALIDATION_ERROR_MESSAGES) validationErrorMessages: ValidationErrorMap,
    private _ngZone: NgZone,
  ) { 
    super(validationErrorMessages) 
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

}
