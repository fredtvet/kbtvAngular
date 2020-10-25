import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Question, QuestionComponent } from '../interfaces';
import { BaseQuestionComponent } from './base-question.component';

export interface FileQuestion extends Question {
    multiple?: boolean;
}

@Component({
  selector: 'app-file-question',
  template: `
  <div class="mt-3 mb-3" fxLayout="column">
    <div class="mat-caption" *ngIf="question.label">{{ question.label }}</div>
    
    <input (change)="onFileChange($event)" type="file" [attr.multiple]="question.multiple" [attr.required]="required">

    <mat-hint *ngIf="question.hint">{{ question.hint }}</mat-hint>

    <mat-error *ngIf="control.dirty && control.invalid">
      {{ getValidationErrorMessage() }}
    </mat-error>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileQuestionComponent extends BaseQuestionComponent<FileQuestion> 
  implements QuestionComponent {

  constructor() { super() }

  onFileChange(e) {      
    if(!e.target.files) return this.control.reset()
    this.control.markAsDirty();
    this.control.setValue(this.question.multiple ? e.target.files : e.target.files[0]);
  }

}
