import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Question, QuestionComponent } from '../interfaces';
import { BaseQuestionComponent } from './base-question.component';

export interface InputQuestion extends Question {
  type: "tel" | "text" | "number" | "email" | "file" | "password";
  hideable?: boolean;
  defaultHidden?: boolean;
  resetable?: boolean;
}

@Component({
  selector: 'app-input-question',
  template: `
    <mat-form-field [color]="question.color || 'accent'" class="w-100">
      <mat-label *ngIf="question.label">{{ question.label }}</mat-label>

      <input matInput 
        [type]="hideField ? 'password' : question.type" 
        [placeholder]="question.placeholder" 
        [formControl]="control" 
        [required]="required" />

      <mat-icon *ngIf="question.hideable" matSuffix (click)="hideField = !hideField">
        {{hideField ? 'visibility_off' : 'visibility'}}
      </mat-icon>

      <mat-hint *ngIf="question.hint">{{ question.hint }}</mat-hint>

      <button mat-icon-button matSuffix *ngIf="question.resetable && !control.disabled && control.value" aria-label="Clear" 
        (click)="control.setValue(''); control.markAsDirty()">
        <mat-icon>close</mat-icon>
      </button>

      <mat-error *ngIf="control.dirty && control.invalid">
        {{ getValidationErrorMessage() }}
      </mat-error>
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputQuestionComponent extends BaseQuestionComponent<InputQuestion> 
  implements QuestionComponent {

  hideField: boolean;

  constructor() { super(); }

  protected onQuestionChanges(question: InputQuestion): void { 
    super.onQuestionChanges(question);
    this.hideField = question.defaultHidden;
  }

}
